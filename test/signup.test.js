const { generarUsuario } = require('../data/generadorDeData');
const { crearPagina } = require('../paginas/fabricaDePaginas');
const { SIGNUP_URL } = require('../configuracion/urls');
const PaginaSignup = require('../paginas/paginaSignup');

const TIMEOUT_INICIALIZAR_BROWSER = 15000;

const USUARIO_CON_EMAIL_YA_REGISTRADO = {
  ...generarUsuario(),
  email: 'pruebaprueba@gmail.com',
};

const USUARIO_CON_USERNAME_YA_REGISTRADO = {
  ...generarUsuario(),
  username: 'prueba',
};

let contexto, paginaSignup;
beforeEach(async () => {
  contexto = await crearPagina({ url: SIGNUP_URL });
  paginaSignup = new PaginaSignup(contexto.page);
}, TIMEOUT_INICIALIZAR_BROWSER);

afterEach(async () => {
  await contexto.browser.close();
});

describe('Signup de Clontagram', () => {
  test('Debe llevar el usuario al feed luego de hacer signup', async () => {
    const usuario = generarUsuario();
    await paginaSignup.llenarFormularioDeSignup(usuario);
    const paginaFeed = await paginaSignup.clickSignup();
    await paginaFeed.verificarFeedVacioSugiereExploraClontagram();
  });

  test('Debe mostrar un error cuando el email ya esta registrado', async () => {
    await paginaSignup.llenarFormularioDeSignup(
      USUARIO_CON_EMAIL_YA_REGISTRADO
    );
    await paginaSignup.clickSignup();
    await paginaSignup.verificarErrorEsMostrado();
  });

  test('Debe mostrar un error cuando el username ya esta registrado', async () => {
    await paginaSignup.llenarFormularioDeSignup(
      USUARIO_CON_USERNAME_YA_REGISTRADO
    );
    await paginaSignup.clickSignup();
    await paginaSignup.verificarErrorEsMostrado();
  });
});
