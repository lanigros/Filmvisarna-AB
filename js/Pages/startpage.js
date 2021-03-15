export default class StartPage {
  //JSON._load

  async read() {
    // Read data from a JSON file
    this.movieInfo = await JSON._load('/json/movies.json');
    return this.movieInfo;

  }
        
  render() {
  
    
    return /*html*/ `
  
 <div class="banner-Container">
   
    <div class="banner-text">
      <div class="banner-title"><h1>${movieInfo[0].title}</h1></div>
      <div class="banner-desc"><p>${movieInfo[0].description}</p></div>
    </div>
        <button class="order-btn">Se trailer</button>
    
</div> 

    
  
  `
  }

}


 //  async function getMovieInfoFromJson() {
  //   this.movieInfo= await $.getJSON('/json/movies.json')
//}
    // getMovieInfoFromJson()