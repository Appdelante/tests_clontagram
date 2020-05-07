const puppeteer = require('puppeteer');

const { generarUsuario } = require('./generadorDeData');

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

  const usuario = generarUsuario();

  await inputDeEmail.type(usuario.email);
  await inputDeNombre.type(usuario.nombre);
  await inputDeUsername.type(usuario.username);
  await inputDeBio.type(usuario.bio);
  await inputDePassword.type(usuario.password);

  const botonDeSignup = await page.$('form > button[type="submit"]');
  await botonDeSignup.click();
}

completarSignup();
