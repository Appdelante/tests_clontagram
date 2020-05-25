const { generarStringRandomizado } = require('../data/generadorDeData');
const {
  crearPaginaQueRequiereAutenticacion,
} = require('../paginas/fabricaDePaginas');
const { POST_EXISTENTE_URL } = require('../configuracion/urls');
const PaginaPost = require('../paginas/paginaPost');
const {
  CREDENCIALES_USUARIO_PARA_TESTS_DE_POSTS,
} = require('../data/credenciales');

let contexto, paginaPost;
beforeEach(async () => {
  contexto = await crearPaginaQueRequiereAutenticacion({
    url: POST_EXISTENTE_URL,
    credenciales: CREDENCIALES_USUARIO_PARA_TESTS_DE_POSTS,
    browserConfig: {
      defaultViewport: { width: 1600, height: 1000 },
    },
  });
  paginaPost = new PaginaPost(contexto.page);
}, __TIMEOUT_INICIALIZAR_BROWSER__);

afterEach(async () => {
  await contexto.browser.close();
});

describe('Vista Post de Clontagram', () => {
  
  test('Puedo dar y quitar un like', async () => {
    await Promise.all([
      paginaPost.esperarQueEstadoDeLikeCambie(),
      paginaPost.clickLike(),
    ]);

    await Promise.all([
      paginaPost.esperarQueEstadoDeLikeCambie(),
      paginaPost.clickLike(),
    ]);
  });

  test('Puedo dejar un comentario en un post', async () => {
    const randomString = generarStringRandomizado();

    await Promise.all([
      paginaPost.esperarQueComentarioAparezcaEnElDOM(),
      paginaPost.dejarComentario(randomString),
    ]);

    const textoDelUltimoComentario = await paginaPost.obtenerTextoDelUltimoComentario();
    expect(textoDelUltimoComentario).toEqual(
      `${CREDENCIALES_USUARIO_PARA_TESTS_DE_POSTS.username} ${randomString}`
    );
  });
});
