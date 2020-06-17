const PaginaBase = require('./paginaBase');

const SELECTOR_BOTON_LIKE = 'div[class="Post__like"] > button';
const SELECTOR_ICONO_CORAZON = `${SELECTOR_BOTON_LIKE} > svg`;
const SELECTOR_INPUT_COMENTARIO =
  'form[class="Post__comentario-form-container"] > input[type="text"]';
const SELECTOR_BOTON_POST_COMENTARIO =
  'form[class="Post__comentario-form-container"] > button[type="submit"]';
const SELECTOR_ULTIMO_COMENTARIO =
  'div[class="Post__comentarios-y-like"] > ul > li:last-child';
const SELECTOR_LISTA_COMENTARIOS = 'ul[class="Post__comentarios"]';
const CLASE_HACER_ROJO = 'text-red-dark';

class PaginaPost extends PaginaBase {
  constructor(page) {
    super(page);
  }

  async clickLike() {
    await this.page.waitForSelector(SELECTOR_BOTON_LIKE);
    await this.page.click(SELECTOR_BOTON_LIKE);
  }

  async esperarQueEstadoDeLikeCambie() {
    const corazonElemento = await this.page.waitForSelector(
      SELECTOR_ICONO_CORAZON
    );

    const corazonEsRojo = await corazonElemento.evaluate((elemento, CLASE_HACER_ROJO) => {
      return elemento.classList.contains(CLASE_HACER_ROJO);
    }, CLASE_HACER_ROJO)

    // Retorna una promesa.
    // - Promesa se va a resolver una vez que la condición sea true
    // - Si en 30 segundos la condición no es true, la promesa es rechazada
    return this.page.waitForFunction((SELECTOR_ICONO_CORAZON, CLASE_HACER_ROJO, corazonEsRojo) => {
      const nuevoEstado = document.querySelector(SELECTOR_ICONO_CORAZON).classList.contains(CLASE_HACER_ROJO);
      return nuevoEstado != corazonEsRojo;
    }, {}, SELECTOR_ICONO_CORAZON, CLASE_HACER_ROJO, corazonEsRojo)
  }

  async dejarComentario(comentario) {
    await this.page.type(SELECTOR_INPUT_COMENTARIO, comentario);
    await this.page.click(SELECTOR_BOTON_POST_COMENTARIO);
  }

  async esperarQueComentarioAparezcaEnElDOM() {
    const listaComentarios = await this.page.waitForSelector(
      SELECTOR_LISTA_COMENTARIOS
    );
    
    const numeroComentarios = await listaComentarios.evaluate((elemento) => {
      return elemento.children.length;
    });

    return await this.page.waitForFunction((SELECTOR_LISTA_COMENTARIOS, numeroComentarios) => {
      const nuevoNumeroComentarios = document.querySelector(SELECTOR_LISTA_COMENTARIOS).children.length;
      return nuevoNumeroComentarios > numeroComentarios;
    }, {}, SELECTOR_LISTA_COMENTARIOS, numeroComentarios)
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
