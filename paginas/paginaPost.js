const PaginaBase = require('./basePage');

const SELECTOR_BOTON_LIKE = 'div[class="Post__like"] > button';
const SELECTOR_ICONO_CORAZON = `${SELECTOR_BOTON_LIKE} > svg`;

class PaginaPost extends PaginaBase {
  constructor(page) {
    super(page);
  }

  async clickLike() {
    await this.page.waitForSelector(SELECTOR_BOTON_LIKE);
    await this.page.click(SELECTOR_BOTON_LIKE);
  }

  async verificarCorazonEstaLleno() {
    const corazonElemento = await this.page.waitForSelector(
      SELECTOR_ICONO_CORAZON
    );
    return corazonElemento.evaluate((elemento) => {
      return elemento.classList.contains('text-red-dark');
    });
  }
}

module.exports = PaginaPost;
