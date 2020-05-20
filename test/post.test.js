const { generarStringRandomizado } = require('../data/generadorDeData');
const { crearPagina } = require('../paginas/fabricaDePaginas');
const { LOGIN_URL, POST_EXISTENTE_URL } = require('../configuracion/urls');
const PaginaLogin = require('../paginas/paginaLogin');
const PaginaPost = require('../paginas/paginaPost');
const {
  CREDENCIALES_USUARIO_PARA_TESTS_DE_POSTS,
} = require('../data/credenciales');

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

describe('Vista Post de Clontagram', () => {
  // Estado: Este test depende de que el post al que naveguemos no tenga un like
  test('Puedo dar y quitar un like', async () => {
    await paginaLogin.llenarFormularioDeLogin(
      CREDENCIALES_USUARIO_PARA_TESTS_DE_POSTS
    );
    await paginaLogin.clickLogin();

    await contexto.page.waitForResponse((response) => {
      return response.url().includes('/api/usuarios/login');
    });

    await contexto.page.goto(POST_EXISTENTE_URL, {
      waitUntil: 'networkidle0',
      timeout: 15000,
    });

    const paginaPost = new PaginaPost(contexto.page);

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
