const puppeteer = require('puppeteer');
const { LOGIN_URL } = require('../configuracion/urls');
const obtenerTokenYDataDeAutenticacion = require('../auth/autenticacion');

async function crearPagina({
  url,
  browserConfig = { headless: true },
  pageConfig = {
    timeout: 15000, // 15 segundos
    waitUntil: 'networkidle0',
  },
}) {
  const browser = await puppeteer.launch(browserConfig);
  const page = await browser.newPage();

  await page.goto(url, pageConfig);

  return {
    browser,
    page,
  };
}

async function crearPaginaQueRequiereAutenticacion({
  url,
  credenciales,
  browserConfig = { headless: true },
  pageConfig = {
    timeout: 15000, // 15 segundos
    waitUntil: 'networkidle0',
  },
}) {
  const browser = await puppeteer.launch(browserConfig);
  const page = await browser.newPage();

  await page.goto(LOGIN_URL, pageConfig);

  const dataDeAutenticacion = await obtenerTokenYDataDeAutenticacion(
    credenciales
  );

  await page.evaluate((token) => {
    localStorage.setItem('CLONTAGRAM_TOKEN', token);
  }, dataDeAutenticacion.token);

  await page.goto(url, pageConfig);

  return {
    browser,
    page,
  };
}

module.exports = {
  crearPagina,
  crearPaginaQueRequiereAutenticacion,
};
