const PaginaUpload = require('./paginaUpload');

const ICONO_CAMARA_NAV_BAR = 'nav > ul > li.Nav__link-push > a';

async function clickIconoDeCamara(page) {
  await page.waitForSelector(ICONO_CAMARA_NAV_BAR, { visible: true });
  await page.click(ICONO_CAMARA_NAV_BAR);
  return new PaginaUpload(page);
}

module.exports = {
  clickIconoDeCamara,
};
