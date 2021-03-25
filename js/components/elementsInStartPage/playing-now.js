export default class PlayingNow{

  

  async read() {
    this.movieInfo = await $.getJSON('/json/movies.json');
  }


    render() {
    
     
    return /*html*/ `
    <div class="playing-now-title"><h1>Spelas just NU!</h1></div>
    <div class="playing-now-container">
    <div class="divboxone"></div>
    <div class="divboxtwo"></div>
    <div class="divboxthree"></div>
    <div class="divboxfour"></div>
    <div class="divboxfive"></div>
    </div>

    `
  }


  imgInBoxes() {
    
    for (let i = 0; i < this.movieInfo.length; i++){
      console.log(this.movieInfo.rated);
    }
  }

}