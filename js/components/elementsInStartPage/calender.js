export default class Calender {

  async read() {
    this.movieInfo = await $.getJSON('/json/movies.json');
  }

  async render() {
    console.log("Started in render@ calender")

    if (!this.movieInfo) {
      await this.read();
    }

    $('main').append(`<div class="calander-Container">
      <div class="calender"></div></div >`)

    this.buildCalender();
  }

  buildCalender() {

    console.log("build calander")

    for (let day = 1; day <= 31; day++) {
      $('.calender').append(`<div class="day"> ${day}</div>`);
    }

  }
}


