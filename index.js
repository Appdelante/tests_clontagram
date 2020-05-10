const puppeteer = require('puppeteer');

const { generarUsuario } = require('./generadorDeData');
const PaginaSignup = require('./paginas/paginaSignup');
const { SIGNUP_URL } = require('./configuracion/urls');

async function completarSignup() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // Usamos la propiedad 'networkidle0' para esperar a que no hayan requests en vuelo por 500 ms
  await page.goto(SIGNUP_URL, {
    timeout: 15000, // 15 segundos
    waitUntil: 'networkidle0',
  });

  const paginaSignup = new PaginaSignup(page);

  const usuario = generarUsuario();
  await paginaSignup.llenarFormularioDeSignup(usuario);
  await paginaSignup.clickSignup();
}

completarSignup();
