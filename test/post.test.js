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

    contexto.page.goto(POST_EXISTENTE_URL, {
      waitUntil: 'networkidle0',
      timeout: 15000,
    });

    const paginaPost = new PaginaPost(contexto.page);
    // 1. Hacemos login
    // 2. Vamos a la pagina de un post
    // 3. Damos like, verificamos que corazon es rojo
    // 4. Quitamos like, verificamos corazon no es rojo
  }, 20000);
});
