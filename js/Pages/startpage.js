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

      <div class="playing-now-title"><h1>Spelas just nu! <span>psst! Klicka på någon av bilderna för att läsa mer om dem!</span></h1></div>
    <div class="playing-now-container">
    
        
        <div class="divboxone">
        <div class="overlay"><div class="divbox-title">${this.movieInfo[0].title}</div></div>
        
        </div>

        <div class="divboxtwo">
        <div class="overlay"><div class="divbox-title">${this.movieInfo[2].title}</div></div>
        
        </div>
        

        <div class="divboxthree">
        <div class="overlay"><div class="divbox-title">${this.movieInfo[3].title}</div></div>
        
        </div>
      

        <div class="divboxfour">
        <div class="overlay"><div class="divbox-title">${this.movieInfo[1].title}</div></div>
        
        </div>

        <div class="divboxfive">
        <div class="overlay"><div class="divbox-title">${this.movieInfo[4].title}</div></div>
        
        </div>
    </div>
    
    `)
    
    $('.divboxone').click(function () {
      window.location.href = '#detailedInfoAboutMovie/Lord%20of%20the%20Rings:%20The%20Fellowship%20of%20the%20Ring/Lilla%20Salongen/2021-04-17/19.00';
    }),

     $('.divboxtwo').click(function () {
    window.location.href='#detailedInfoAboutMovie/Inception/Lilla%20Salongen/2021-04-18/19.00';
     }),
      
      $('.divboxthree').click(function () {
    window.location.href='#detailedInfoAboutMovie/Matrix/Stora%20Salongen/2021-04-18/21.00';
      }),
       $('.divboxfour').click(function () {
    window.location.href='#detailedInfoAboutMovie/The%20Dark%20Knight/Stora%20Salongen/2021-04-17/17.00';
       }),
      $('.divboxfive').click(function () {
    window.location.href='#detailedInfoAboutMovie/Parasite/Stora%20Salongen/2021-04-17/21.00';
      })
  }

  

 
}


