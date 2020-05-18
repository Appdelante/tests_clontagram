const PaginaBase = require('./paginaBase');
const PaginaFeed = require('./paginaFeed');

const SELECTOR_CAJA_ELIGE_FOTO = 'label[class="Upload__image-label"]';
const SELECTOR_TEXT_AREA_CAPTION = 'textarea[name="caption"]';
const SELECTOR_BOTON_POST = 'button[type="submit"]';
const SELECTOR_IMAGEN_A_SUBIR = 'div[class="Upload__image-section"] > img';

class PaginaUpload extends PaginaBase {
  constructor(page) {
    super(page);
  }

  async verificarPaginaUploadEsCorrecta() {
    await this.page.waitForSelector(SELECTOR_CAJA_ELIGE_FOTO, {
      visible: true,
    });
    await this.page.waitForSelector(SELECTOR_TEXT_AREA_CAPTION, {
      visible: true,
    });
    await this.page.waitForSelector(SELECTOR_BOTON_POST, {
      visible: true,
    });
  }

  async llenarCaption(caption) {
    await this.page.waitForSelector(SELECTOR_TEXT_AREA_CAPTION);
    await this.page.type(SELECTOR_TEXT_AREA_CAPTION, caption);
  }

  async elegirFotoParaUpload(pathImagen) {
    await this.page.waitForSelector(SELECTOR_CAJA_ELIGE_FOTO);
    const [fileChooser] = await Promise.all([
      this.page.waitForFileChooser(),
      this.page.click(SELECTOR_CAJA_ELIGE_FOTO),
    ]);
    await fileChooser.accept([pathImagen]);
  }

  async clickPostImagen() {
    await this.page.waitForSelector(SELECTOR_BOTON_POST);
    await this.page.click(SELECTOR_BOTON_POST);
    return new PaginaFeed(this.page);
  }

  async verificarImagenEstaListaParaPostear() {
    await this.page.waitForSelector(SELECTOR_IMAGEN_A_SUBIR);
  }
}

module.exports = PaginaUpload;
