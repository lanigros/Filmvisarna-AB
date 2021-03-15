export default class DetailedInfoAboutMovie {

  async read() {

    this.movieInfo = await $.getJSON('/json/movies.json');

  }

  async render() {

    if (!this.movieInfo) {
      await this.read();
    }

    return /*html*/ `
    
      <div class="detailedInfoAboutMovie-Container">

        <div class="banner_movie_container">    
          <img src="${this.movieInfo[0].images}">
        </div>

        <div class="movie_title"><h1>${this.movieInfo[0].title}</h1></div>
        <div class="movie_duration_lenght"><h1>${this.movieInfo[0].lenght}</h1></div>
        <div class="movie_genre"><h1>${this.movieInfo[0].genre}</h1></div>


          <div class="movie_text">
            
            <div class="movie_desc"><p>${this.movieInfo[0].description}</p></div>
            <button class="order-btn">Se trailer</button>
          </div> 

        </div>`
  }
}