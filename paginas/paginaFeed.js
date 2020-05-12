const SELECT_EXPLORA_CONTAGRAM_BOX = "div[class='NoSiguesANadie']";

class PaginaFeed {
  constructor(pagina) {
    this.page = pagina;
  }

  async verificarFeedVacioSugiereExploraClontagram() {
    await this.page.waitForSelector(SELECT_EXPLORA_CONTAGRAM_BOX, {
      visible: true,
    });
  }
}

module.exports = PaginaFeed;
