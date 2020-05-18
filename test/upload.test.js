const path = require('path');
const { generarStringRandomizado } = require('../data/generadorDeData');
const { crearPagina } = require('../paginas/fabricaDePaginas');
const { clickIconoDeCamara } = require('../paginas/barraDeNavegacion');
const { LOGIN_URL } = require('../configuracion/urls');
const PaginaLogin = require('../paginas/paginaLogin');
const { CREDENCIALES_VALIDAS } = require('../data/credenciales');

const TIMEOUT_INICIALIZAR_BROWSER = 15000;
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
  });

  test('Subir una imagen debe llevar al usuario al feed done su post es mostrado', async () => {
    const captionRandom = generarStringRandomizado();
    await paginaLogin.llenarFormularioDeLogin(CREDENCIALES_VALIDAS);
    await paginaLogin.clickLogin();
    const paginaUpload = await clickIconoDeCamara(contexto.page);
    await paginaUpload.llenarCaption(captionRandom);
    await paginaUpload.elegirFotoParaUpload(PATH_A_IMAGEN_A_SUBIR);
    await paginaUpload.verificarImagenEstaListaParaPostear();

    const paginaFeed = await paginaUpload.clickPostImagen();

    const dataDeUsuario = await paginaFeed.obtenerUsuarioDelPrimerPost();
    expect(dataDeUsuario).toEqual({
      texto: CREDENCIALES_VALIDAS.username,
      href: `/perfil/${CREDENCIALES_VALIDAS.username}`,
    });

    const caption = await paginaFeed.obtenerCaptionDelPrimerPost();
    expect(caption).toEqual(
      `${CREDENCIALES_VALIDAS.username} ${captionRandom}`
    );
  });
});
