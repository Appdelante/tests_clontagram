const path = require('path');
const { crearPagina } = require('../paginas/fabricaDePaginas');
const { clickIconoDeCamara } = require('../paginas/barraDeNavegacion');
const { LOGIN_URL } = require('../configuracion/urls');
const PaginaLogin = require('../paginas/paginaLogin');
const { CREDENCIALES_VALIDAS } = require('../data/credenciales');

const TIMEOUT_INICIALIZAR_BROWSER = 15000;
const CAPTION = 'Esta es mi foto del día!';
const PATH_A_IMAGEN_A_SUBIR = path.join(
  __dirname,
  '..',
  'data',
  'imagenes',
  'juego_snake.png'
);

let contexto, paginaLogin;
beforeEach(async () => {
  contexto = await crearPagina({
    url: LOGIN_URL,
    browserConfig: { headless: false, slowMo: 30 },
  });
  paginaLogin = new PaginaLogin(contexto.page);
}, TIMEOUT_INICIALIZAR_BROWSER);

afterEach(async () => {
  await contexto.browser.close();
});

describe('Upload de Clontagram', () => {
  test('Hacer click en el icono de cámara debe llevar el usuario a la página /upload', async () => {
    await paginaLogin.llenarFormularioDeLogin(CREDENCIALES_VALIDAS);
    await paginaLogin.clickLogin();
    const paginaUpload = await clickIconoDeCamara(contexto.page);
    await paginaUpload.verificarPaginaUploadEsCorrecta();
  }, 20000);

  test('Subir una imagen debe llevar al usuario al feed done su post es mostrado', async () => {
    await paginaLogin.llenarFormularioDeLogin(CREDENCIALES_VALIDAS);
    await paginaLogin.clickLogin();
    const paginaUpload = await clickIconoDeCamara(contexto.page);
    // 1. Poner caption
    await paginaUpload.llenarCaption(CAPTION);
    // 2. Elegir una foto
    await paginaUpload.elegirFotoParaUpload(PATH_A_IMAGEN_A_SUBIR);
    // 3. Click en el boton post
    // 4. Verificar que estamos en el feed
    // 5. Verificar que nuestro post que subimos esta visible
  }, 20000);
});
