import { isWeekend, getDayName } from "./date-helper.js";

export default class Calendar {

  async read() {
    this.schedule = await $.getJSON('/json/movieSchedule.json');
    this.movieInfo = await $.getJSON('/json/movies.json');
  }

  async render() {

    if (!this.schedule && !this.movieInfo) {
      await this.read();
    }
    this.buildCalendar();
  }

  pickedDate;


  buildCalendar() {

    console.log(this.schedule)

    $("main").append(`
    <div class="calendar-Container">
          <div class="calendar"></div>
          <div class="lilla-salongen-container"><h1>Lilla salongen</h1></div>
          <div class="stora-salongen-container"><h1>Stora salongen</h1></div>
      </div >`);

    console.log("build calendar")

    let dates = [];

    //Adding all 31 days in month into "calandar_Container" with own divs.
    for (let day = 1; day <= 31; day++) {

      const weekend = isWeekend(day);
      let name = "";
      if (day <= 7) {
        const dayName = getDayName(day);
        name = `<div class="name">${dayName}</div>`;
      }

      let datum = new Date(2021, 3, day + 1).toISOString().split('T')[0];
      dates.push(datum);

      $('.calendar').append(`<div class="day ${weekend ? "weekend" : ""}">${name} <button value="${datum}" class="btn-show-calender">${day}</button>  </div>`);
    }

    $('.btn-show-calender').click(function () {
      pickedDate = $(this).val();
      console.log(pickedDate);

      return pickedDate;

    })

  }

  testing() {



  }



}







