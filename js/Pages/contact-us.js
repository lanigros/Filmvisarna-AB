export default class contactUs {

  async read() {
    this.movieInfo = await $.getJSON('/json/movies.json');
  }

  async render() {

    if (!this.movieInfo) {
      await this.read();
    }


    return /*html*/ `
  
 <h1>Test Page</h1>
  
  `
  }

}
