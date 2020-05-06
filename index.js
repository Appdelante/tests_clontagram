const puppeteer = require('puppeteer');

async function completarSignup() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // Usamos la propiedad 'networkidle0' para esperar a que no hayan requests en vuela por 500 ms
  await page.goto('https://beta.clontagram.com/signup', {
    timeout: 15000, // 15 segundos
    waitUntil: 'networkidle0',
  });
}

completarSignup();
