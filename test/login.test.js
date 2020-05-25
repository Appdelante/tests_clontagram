const { crearPagina } = require('../paginas/fabricaDePaginas');
const { LOGIN_URL } = require('../configuracion/urls');
const PaginaLogin = require('../paginas/paginaLogin');
const {
  CREDENCIALS_NO_SIGUE_A_NADIE_NO_HA_SUBIDO_FOTOS,
  CREDENCIALES_EMAIL_NO_EXISTE,
  CREDENCIALES_PASSWORD_INCORRECTO,
} = require('../data/credenciales');

const TIMEOUT_INICIALIZAR_BROWSER = 15000;

let contexto, paginaLogin;
beforeEach(async () => {
  contexto = await crearPagina({
    url: LOGIN_URL,
    browserConfig: { headless: true },
  });
  paginaLogin = new PaginaLogin(contexto.page);
}, TIMEOUT_INICIALIZAR_BROWSER);

afterEach(async () => {
  await contexto.browser.close();
});

describe('Login de Clontagram', () => {
  test('Debe lleva al usuario al feed luego de hacer login con credenciales validas', async () => {
    await paginaLogin.llenarFormularioDeLogin({
      email: CREDENCIALS_NO_SIGUE_A_NADIE_NO_HA_SUBIDO_FOTOS.email,
      password: CREDENCIALS_NO_SIGUE_A_NADIE_NO_HA_SUBIDO_FOTOS.password,
    });
    const paginaFeed = await paginaLogin.clickLogin();
    await paginaFeed.verificarFeedVacioSugiereExploraClontagram();
  });

  test('Debe mostrar un error cuando el email no existe', async () => {
    await paginaLogin.llenarFormularioDeLogin({
      email: CREDENCIALES_EMAIL_NO_EXISTE.email,
      password: CREDENCIALES_EMAIL_NO_EXISTE.password,
    });
    await paginaLogin.clickLogin();
    await paginaLogin.verificarErrorEsMostrado();
  });

  test('Debe mostrar un error cuando la contraseña es incorrecta', async () => {
    await paginaLogin.llenarFormularioDeLogin({
      email: CREDENCIALES_PASSWORD_INCORRECTO.email,
      password: CREDENCIALES_PASSWORD_INCORRECTO.password,
    });
    await paginaLogin.clickLogin();
    await paginaLogin.verificarErrorEsMostrado();
  });
});
