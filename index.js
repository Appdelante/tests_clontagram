const puppeteer = require('puppeteer');

async function completarSignup() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // Usamos la propiedad 'networkidle0' para esperar a que no hayan requests en vuelo por 500 ms
  await page.goto('https://beta.clontagram.com/signup', {
    timeout: 15000, // 15 segundos
    waitUntil: 'networkidle0',
  });

  const inputDeEmail = await page.$('form > input[name="email"]');
  const inputDeNombre = await page.$('form > input[name="nombre"]');
  const inputDeUsername = await page.$('form > input[name="username"]');
  const inputDeBio = await page.$('form > input[name="bio"]');
  const inputDePassword = await page.$('form > input[name="password"]');

  await inputDeEmail.type('prueba88@gmail.com');
  await inputDeNombre.type('Ana Prueba');
  await inputDeUsername.type('ana88');
  await inputDeBio.type('Esta es una cuenta de prueba');
  await inputDePassword.type('pruebaprueba');

  const botonDeSignup = await page.$('form > button[type="submit"]');
  await botonDeSignup.click();
}

completarSignup();
