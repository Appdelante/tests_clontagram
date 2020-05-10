const puppeteer = require('puppeteer');
const { generarUsuario } = require('../generadorDeData');
const { SIGNUP_URL } = require('../configuracion/urls');
const PaginaSignup = require('../paginas/paginaSignup');

describe('Signup de Clontagram', () => {
  test('Debe llevar el usuario al feed luego de hacer signup', async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(SIGNUP_URL, {
      timeout: 15000, // 15 segundos
      waitUntil: 'networkidle0',
    });

    const paginaSignup = new PaginaSignup(page);

    const usuario = generarUsuario();
    await paginaSignup.llenarFormularioDeSignup(usuario);
    await paginaSignup.clickSignup();

    // TODO: Verificar que estamos en feed

    await browser.close();
  }, 15000);
});
