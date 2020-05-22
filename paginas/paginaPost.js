const PaginaBase = require('./paginaBase');

const SELECTOR_BOTON_LIKE = 'div[class="Post__like"] > button';
const SELECTOR_ICONO_CORAZON = `${SELECTOR_BOTON_LIKE} > svg`;
const SELECTOR_INPUT_COMENTARIO =
  'form[class="Post__comentario-form-container"] > input[type="text"]';
const SELECTOR_BOTON_POST_COMENTARIO =
  'form[class="Post__comentario-form-container"] > button[type="submit"]';
const SELECTOR_ULTIMO_COMENTARIO =
  'div[class="Post__comentarios-y-like"] > ul > li:last-child';

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

  async dejarComentario(comentario) {
    await this.page.type(SELECTOR_INPUT_COMENTARIO, comentario);
    await this.page.click(SELECTOR_BOTON_POST_COMENTARIO);
  }

  async obtenerTextoDelUltimoComentario() {
    const ultimoComentario = await this.page.waitForSelector(
      SELECTOR_ULTIMO_COMENTARIO
    );
    return await ultimoComentario.evaluate((comentario) => {
      return comentario.innerText;
    });
  }
}

module.exports = PaginaPost;
