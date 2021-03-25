import Calendar from '../components/elementsInStartPage/calendar.js';


export default class StartPage {

  async read() {
    this.schedule = await $.getJSON('/json/movieSchedule.json');
    this.movieInfo = await $.getJSON('/json/movies.json');
  }

  async render() {

    console.log("Called from start of async render in startpage");

    if (!this.movieInfo) {
      await this.read();
    }

    const calendar = new Calendar(this.schedule, this.movieInfo);

    return /*html*/ `
  
    <div class="banner-Container">
   
      <div class="banner-text">
        <div class="banner-title"><h1>${this.movieInfo[0].title}</h1></div>
        <div class="banner-desc"><p>${this.movieInfo[0].description}</p></div>
      </div>
          <button class="order-btn">Se trailer</button>
    
    </div>

      <div class="trailer-wrapper">
        <div class="title">Kommande Filmer</div>
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
      
      <div class="ads-banner"></div>

    ${calendar.render()}
  
  `}

}

