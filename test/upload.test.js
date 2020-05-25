const path = require('path');
const { generarStringRandomizado } = require('../data/generadorDeData');
const {
  crearPaginaQueRequiereAutenticacion,
} = require('../paginas/fabricaDePaginas');
const { clickIconoDeCamara } = require('../paginas/barraDeNavegacion');
const { BASE_URL } = require('../configuracion/urls');
const { CREDENCIALES_VALIDAS } = require('../data/credenciales');

const PATH_A_IMAGEN_A_SUBIR = path.join(
  __dirname,
  '..',
  'data',
  'imagenes',
  'juego_snake.png'
);

let contexto;
beforeEach(async () => {
  contexto = await crearPaginaQueRequiereAutenticacion({
    url: BASE_URL,
    credenciales: CREDENCIALES_VALIDAS,
  });
}, __TIMEOUT_INICIALIZAR_BROWSER__);

afterEach(async () => {
  await contexto.browser.close();
});

describe('Upload de Clontagram', () => {
  test('Hacer click en el icono de cámara debe llevar el usuario a la página /upload', async () => {
    const paginaUpload = await clickIconoDeCamara(contexto.page);
    await paginaUpload.verificarPaginaUploadEsCorrecta();
  });

  test('Subir una imagen debe llevar al usuario al feed done su post es mostrado', async () => {
    const captionRandom = generarStringRandomizado();
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
