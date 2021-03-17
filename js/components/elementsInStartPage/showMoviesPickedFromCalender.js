export default class ShowMoviesPickedFromCalender {

  async read() {
    this.schedule = await $.getJSON('/json/movieSchedule.json');
  }

  async render() {
    if (!this.schedule) {
      await this.read();
    }

    this.buildBoxOne();
    this.buildBoxTwo();

  }


  buildBoxOne() {

    $('.calandar-Container').append(`<div class="lilla-salongen-container">   
    
    
    </div>
      
    `)

  }


  buildBoxTwo() {

    $('.calandar-Container').append(`
    <div class="stora-salongen-container"></div>
  
    `)
  }



}