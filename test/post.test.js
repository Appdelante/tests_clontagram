const { generarStringRandomizado } = require('../data/generadorDeData');
const {
  crearPaginaQueRequiereAutenticacion,
} = require('../paginas/fabricaDePaginas');
const { POST_EXISTENTE_URL } = require('../configuracion/urls');
const PaginaLogin = require('../paginas/paginaLogin');
const PaginaPost = require('../paginas/paginaPost');
const {
  CREDENCIALES_USUARIO_PARA_TESTS_DE_POSTS,
} = require('../data/credenciales');

const TIMEOUT_INICIALIZAR_BROWSER = 15000;

let contexto, paginaPost;
beforeEach(async () => {
  contexto = await crearPaginaQueRequiereAutenticacion({
    url: POST_EXISTENTE_URL,
    credenciales: CREDENCIALES_USUARIO_PARA_TESTS_DE_POSTS,
    browserConfig: { headless: false },
  });
  paginaPost = new PaginaPost(contexto.page);
}, TIMEOUT_INICIALIZAR_BROWSER);

afterEach(async () => {
  await contexto.browser.close();
});

describe('Vista Post de Clontagram', () => {
  // Estado: Este test depende de que el post al que naveguemos no tenga un like
  test('Puedo dar y quitar un like', async () => {
    await Promise.all([
      esperarAQueLlegueRespuestaSobreElLike(),
      paginaPost.clickLike(),
    ]);

    let corazonEstaLleno = await paginaPost.verificarCorazonEstaLleno();
    expect(corazonEstaLleno).toEqual(true);

    await Promise.all([
      esperarAQueLlegueRespuestaSobreElLike(),
      paginaPost.clickLike(),
    ]);

    corazonEstaLleno = await paginaPost.verificarCorazonEstaLleno();
    expect(corazonEstaLleno).toEqual(false);
  }, 20000);
});

async function esperarAQueLlegueRespuestaSobreElLike() {
  return await contexto.page.waitForResponse((response) => {
    return response.url().includes('/likes');
  });
}
