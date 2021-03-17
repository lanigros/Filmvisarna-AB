import { isWeekend, getDayName } from "./date-helper.js";

export default class Calendar {

  async read() {
    this.movieInfo = await $.getJSON('/json/movies.json');
  }

  async render() {

    if (!this.movieInfo) {
      await this.read();
    }

    this.buildCalendar();
  }

  buildCalendar() {

    $('main').append(`<div class="calandar-Container">
      <div class="calendar"></div></div >`)

    console.log("build calandar")


    for (let day = 1; day <= 31; day++) {

      const weekend = isWeekend(day);
      let name = "";
      if (day <= 7) {
        const dayName = getDayName(day);
        name = `<div class="name">${dayName}</div>`;
      }

      $('.calendar').append(`<div class="day ${weekend ? "weekend" : ""}">${name}${day}</div>`);
    }

  }
}


