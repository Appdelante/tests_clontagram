const { crearPagina } = require('../paginas/fabricaDePaginas');
const { LOGIN_URL } = require('../configuracion/urls');
const PaginaLogin = require('../paginas/paginaLogin');
const { CREDENCIALES_VALIDAS } = require('../data/credenciales');

const TIMEOUT_INICIALIZAR_BROWSER = 15000;

let contexto, paginaLogin;
beforeEach(async () => {
  contexto = await crearPagina({
    url: LOGIN_URL,
    browserConfig: { headless: false },
  });
  paginaLogin = new PaginaLogin(contexto.page);
}, TIMEOUT_INICIALIZAR_BROWSER);

afterEach(async () => {
  await contexto.browser.close();
});

describe('Login de Clontagram', () => {
  test('Debe lleva al usuario al feed luego de hacer login con credenciales validas', async () => {
    await paginaLogin.llenarFormularioDeLogin({
      email: CREDENCIALES_VALIDAS.email,
      password: CREDENCIALES_VALIDAS.password,
    });
    const paginaFeed = await paginaLogin.clickLogin();
    await paginaFeed.verificarFeedVacioSugiereExploraClontagram();
  });
});
