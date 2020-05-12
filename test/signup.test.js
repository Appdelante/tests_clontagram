const puppeteer = require('puppeteer');
const { generarUsuario } = require('../generadorDeData');
const { SIGNUP_URL } = require('../configuracion/urls');
const PaginaSignup = require('../paginas/paginaSignup');

const TIMEOUT_INICIALIZAR_BROWSER = 15000;

let browser, page, paginaSignup;
beforeEach(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();

  await page.goto(SIGNUP_URL, {
    timeout: 15000, // 15 segundos
    waitUntil: 'networkidle0',
  });

  paginaSignup = new PaginaSignup(page);
}, TIMEOUT_INICIALIZAR_BROWSER);

afterEach(async () => {
  await browser.close();
});

describe('Signup de Clontagram', () => {
  test('Debe llevar el usuario al feed luego de hacer signup', async () => {
    const usuario = generarUsuario();
    await paginaSignup.llenarFormularioDeSignup(usuario);
    const paginaFeed = await paginaSignup.clickSignup();
    await paginaFeed.verificarFeedVacioSugiereExploraClontagram();
  }, 15000);
});
