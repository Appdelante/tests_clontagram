const SELECTOR_EMAIL = 'form > input[name="email"]';
const SELECTOR_NOMBRE = 'form > input[name="nombre"]';
const SELECTOR_USERNAME = 'form > input[name="username"]';
const SELECTOR_BIO = 'form > input[name="bio"]';
const SELECTOR_PASSWORD = 'form > input[name="password"]';
const SELECTOR_BOTON_SUBMIT = 'form > button[type="submit"]';

// Page Object Model (POM)
class PaginaSignup {
  constructor(pagina) {
    this.page = pagina;
  }

  async llenarFormularioDeSignup(usuario) {
    await this.page.type(SELECTOR_EMAIL, usuario.email);
    await this.page.type(SELECTOR_NOMBRE, usuario.nombre);
    await this.page.type(SELECTOR_USERNAME, usuario.username);
    await this.page.type(SELECTOR_BIO, usuario.bio);
    await this.page.type(SELECTOR_PASSWORD, usuario.password);
  }

  async clickSignup() {
    await this.page.click(SELECTOR_BOTON_SUBMIT);
  }
}

module.exports = PaginaSignup;
