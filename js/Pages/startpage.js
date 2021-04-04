import Calendar from '../components/elementsInStartPage/calendar.js';
import PlayingNow from '../components/elementsInStartPage/playing-now.js';

const calendar = new Calendar();
const playingNow = new PlayingNow();

export default class StartPage {

  async read() {
    this.schedule = await $.getJSON('/json/movieSchedule.json');
    this.movieInfo = await $.getJSON('/json/movies.json');
  }

  async render() {

    if (!this.movieInfo) {
      await this.read();
    }

    this.startPageClear();
    this.buildBannerInStartPage();
    calendar.render(this.schedule, this.movieInfo);
    this.buildUpCommingMovies();
    this.adBanner();
    this.playingNow();

  }

  startPageClear() {
    $("main").html(``)
  }

  buildBannerInStartPage() {
    $("main").append(`
    
      <div class="banner-Container">

      <div class="banner-text">
        <div class="banner-title"><h1>${this.movieInfo[0].title}</h1></div>
        <div class="banner-desc"><p>${this.movieInfo[0].description}</p></div>
      </div>
          <button class="trailer-btn">Se trailer</button>

      </div>
    
    `)
  }

  buildUpCommingMovies() {
    $("main").append(`
      <div class="title">Kommande Filmer</div>
       <div class="trailer-wrapper">        
            <div class="trailers">
              <div class="item"><img src="img/movieImg/joker.jpg"></div>
              <div class="item"><img src="img/movieImg/avangers.jpg"></div>
              <div class="item"><img src="img/movieImg/kong.jpg"></div>
              <div class="item"><img src="img/movieImg/grimsby.jpg"></div>
              <div class="item"><img src="img/movieImg/dora.jpg"></div>
              <div class="item"><img src="img/movieImg/joker.jpg"></div>
              <div class="item"><img src="img/movieImg/avangers.jpg"></div>
              <div class="item"><img src="img/movieImg/kong.jpg"></div>
              <div class="item"><img src="img/movieImg/grimsby.jpg"></div>
              <div class="item"><img src="img/movieImg/dora.jpg"></div>
            </div>
      </div>       
    `)
  }

  adBanner() {
    $('main').append(`
    <div class="ads-banner"></div>
    `)
  }

  playingNow() {
    $('main').append(/*html*/ `

    <div class="playing-now-title"><h1>Spelas just NU!</h1></div>
    <div class="playing-now-container">
    
    
    <div class="divboxone">
    <h3 class="divboxone-title">${this.movieInfo[0].title}</h3>
    </div>
    <div class="divboxtwo">
    <h3 class="divboxtwo-title">${this.movieInfo[2].title}</h3>
    </div>
    <div class="divboxthree">
    <h3 class="divboxthree-title">${this.movieInfo[3].title}</h3>
    </div>
    <div class="divboxfour">
    <h3 class="divboxfour-title">${this.movieInfo[1].title}</h3>
    </div>
    <div class="divboxfive">
    <h3 class="divboxfive-title">${this.movieInfo[4].title}</h3>
    </div>
    </div>
    
    `)
    
    // $('.divboxone').hover(function () {
    //   $('.divboxone-title').fadeIn(200);
    // }, function () {
    //   $('.divboxone-title').fadeOut(200);
    // });
  }

 
}


