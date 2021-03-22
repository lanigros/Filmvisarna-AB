export default class DetailedInfoAboutMovie {

  async read() {

    this.movieInfo = await $.getJSON('/json/movies.json');
    this.movieSchedule = await $.getJSON('/json/movieSchedule.json');
  }

  async render() {

    if (!this.movieInfo && !this.movieDetail) {
      await this.read();
    }
    if (!this.movieSchedule) {
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
       
      
        <div class="movie_trailer_container">
          <!-- Copy & Pasted from YouTube -->
          <iframe width="560" height="349" src="${this.movieInfo[0].youtubeTrailers}" frameborder="0" allowfullscreen></iframe>
        </div>

        <div class="movie_desc_container">
        <p>${this.movieInfo[0].description}</p>
            <br>
            <p>Salong: ${this.movieSchedule[4].auditorium}</p>     
             <P>Nästa tillfälle: ${this.movieSchedule[4].date}</P>     
              <P>Klockan: ${this.movieSchedule[4].time}</P>       
                </div>                 
                   
                   
                <button class="order-btn">Boka biljetter</button>
                <button onclick="document.getElementById('demo').innerHTML = Date()">The time is?</button
        
        
        
        `
  }
}


//
//  "auditorium": "Stora Salongen",
//     "film": "Lord of the Rings: The Fellowship of the Ring",
//     "date": "2021-04-13",
//     "weekday": "tisdag",
//     "time": "17.00"