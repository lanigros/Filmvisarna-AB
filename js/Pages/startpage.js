export default class StartPage {


  async read() {
    this.movieInfo = await $.getJSON('/json/movies.json');
  

  }

  async render() {

    if (!this.movieInfo) {
      await this.read();
    }
    

    return /*html*/ `
  
 <div class="banner-Container">
   <img src="${this.movieInfo[0].images}">
    <div class="banner-text">
      <div class="banner-title"><h1>${this.movieInfo[0].title}</h1></div>
      <div class="banner-desc"><p>${this.movieInfo[0].description}</p></div>
    </div>
        <button class="order-btn">Se trailer</button>
    
</div>    
  
  `
  }
}
