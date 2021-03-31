export default class DetailedInfoAboutMovie {

  async read() {

    this.movieInfo = await $.getJSON('/json/movies.json');
    this.movieDetail = await $.getJSON('/json/movieSchedule.json')
  }

  async render() {

    if (!this.movieInfo && !this.movieDetail) {
      await this.read();
    }

    return /*html*/ `
    
      <div class="detailedInfoAboutMovie-Container">

        <div class="banner_movie_container">    
        <div class="movie-banner"></div>  
        <div class="movie_trailer_container">
          <!-- Copy & Pasted from YouTube -->
          <iframe width="560" height="349" src="${this.movieInfo[0].youtubeTrailers}" frameborder="0" allowfullscreen></iframe>
        </div>
        <div class="movie_desc_container">
        <h1>${this.movieInfo[0].title}</h1>
        <h3>${this.movieInfo[0].lenght}</h3>
        <h4>${this.movieInfo[0].genre}</h4>
        <h4>${this.movieInfo[0].rated}</h4>
        <p>${this.movieInfo[0].description}</p>
        <br>
        <p>Salong: ${this.movieDetail[4].auditorium}</p>
        <P>Nästa tillfälle: ${this.movieDetail[4].date}</P>
        <P>Klockan: ${this.movieDetail[4].time}</P>
        <button class="order-btn">Boka biljetter</button>
        </div>
        
        </div>
        
        
        `
  }
}


