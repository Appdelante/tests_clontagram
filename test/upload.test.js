const { crearPagina } = require('../paginas/fabricaDePaginas');
const { LOGIN_URL } = require('../configuracion/urls');
const PaginaLogin = require('../paginas/paginaLogin');
const { CREDENCIALES_VALIDAS } = require('../data/credenciales');

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

describe('Upload de Clontagram', () => {
  test('Hacer click en el icono de cámara debe llevar el usuario a la página /upload', async () => {
    // Código
    await paginaLogin.llenarFormularioDeLogin(CREDENCIALES_VALIDAS);
    await paginaLogin.clickLogin();
    // Hacer click en icono camara
    // 1. Poner esa función en la página feed
    // 2. Poner esa función en PaginaBase (compleja)
    // 3. Módulo para representar a la barra de navegación
  });
});
