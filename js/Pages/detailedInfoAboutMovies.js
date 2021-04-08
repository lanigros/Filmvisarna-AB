import FileFunctions from "/js/fileFunctions.js";
export default class DetailedInfoAboutMovie {

  async read() {

    this.movieInfo = await $.getJSON('/json/movies.json');
    this.movieDetail = await $.getJSON('/json/movieSchedule.json')
  }

  async render(movie, auditorium, date, time) {

    if (!this.movieInfo && !this.movieDetail) {
      await this.read();
    }

    let currentMovie = "";
    let currentMovieSchedule = "";

    for (let i = 0; i < this.movieInfo.length; i++) {
      let tempFile = this.movieInfo[i].title;

      if (movie.replaceAll('%20', ' ').toLowerCase() === tempFile.toLowerCase()) {
        currentMovie = this.movieInfo[i];
      }
    }

    // In order to compare elements, we need to replace the space and -
    for (let i = 0; i < this.movieDetail.length; i++) {
      if (movie.replaceAll('%20', ' ').toLowerCase() === this.movieDetail[i].film.toLowerCase()
        && auditorium.replaceAll('%20', ' ') === this.movieDetail[i].auditorium
        && date.replaceAll('-', '') === this.movieDetail[i].date.replaceAll('-', '')
        && time === this.movieDetail[i].time)

        currentMovieSchedule = this.movieDetail[i];
    }

    return /*html*/ `
    
      <div class="detailedInfoAboutMovie-Container">

        <div class="banner_movie_container">    
        <div class="movie-banner"><img src="${currentMovie.images}"></div>
        <div class="movie_trailer_container">
          <iframe width="98%" height="100%" src="${currentMovie.youtubeTrailers + '?autoplay=1&mute=1'}" allow="autoplay; encrypted-media" frameborder="0" allowfullscreen></iframe>
        </div>

        <div class="movie_desc_container">
        <h1>${currentMovie.title}</h1>
        <h3>${currentMovie.lenght}</h3>
        <h4>${currentMovie.genre}</h4>
        <h4>${currentMovie.rated}</h4>
        <p>${currentMovie.description}</p>
        <br>
        <p>Språk: ${currentMovie.languages}</p>
        <p>Undertexter: ${currentMovie.subtitle}</p>
        <p>Regissör: ${currentMovie.director}</p>
        <p>Skådespelare: <br> ${currentMovie.actors}</p>
        <br>
        <P>Nästa tillfälle: ${currentMovieSchedule.date}</P>
        <p>Salong: ${currentMovieSchedule.auditorium}</p>
        <P>Klockan: ${currentMovieSchedule.time}</P>
        <br>
        <button class="order-btn">
        <a class="link-to-booking-page" href="#booking" id="${FileFunctions.getBookingFile(currentMovieSchedule.film, currentMovieSchedule.auditorium, currentMovieSchedule.date, currentMovieSchedule.time)}">Boka nu</a>
        </button>
        </div>
        
        </div>
        
        
        `
  }
}



