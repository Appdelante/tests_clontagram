const puppeteer = require('puppeteer');

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

module.exports = {
  crearPagina,
};
