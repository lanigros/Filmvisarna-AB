export default class StartPage {
   
  //JSON._load

  async read() {
    // Read data from a JSON file
    this.movieInfo = await $.getJSON('/json/movies.json');
    return;
  }

        
  render() {
  
  //  async function getMovieInfoFromJson() {
  //   this.movieInfo= await $.getJSON('/json/movies.json')
//}
    // getMovieInfoFromJson()
    
    return /*html*/ `
  
 <div class="banner-Container">
    ${this.movieInfo[0].images};
    <div class="banner-text">
      <div class="banner-title"><h1>${this.movieInfo[0].title}</h1></div>
      <div class="banner-desc"><p>${this.movieInfo[0].description}</p></div>
    </div>
        <button class="order-btn">Se trailer</button>
    
</div> 

    
  
  `
  }

}


