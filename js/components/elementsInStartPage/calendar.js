import { isWeekend, getDayName } from "./date-helper.js";

export default class Calendar {

  async read() {
    
    this.movieInfo = await $.getJSON('/json/movies.json');
    this.schedule = await $.getJSON('/json/movieSchedule.json');
  }

  async render() {

    if (!this.schedule && !this.movieInfo) {
      await this.read();
    }

    this.buildCalendar();
  }


  buildCalendar() {

    $("main").append(`
    <div class="calendar-Container">
          <div class="calendar"></div>
          <div class="lilla-salongen-container"><h1>Lilla Salongen</h1>
          <div class="ongoing-Movies"></div>
          </div>
          <div class="stora-salongen-container"><h1>Stora Salongen</h1>
          </div>
      </div >`);

    console.log("build calendar")

    //Adding all 31 days in month into "calandar_Container" with own divs.
    for (let day = 1; day <= 31; day++) {

      const weekend = isWeekend(day);
      let name = "";
      if (day <= 7) {
        const dayName = getDayName(day);
        name = `<div class="name">${dayName}</div>`;
      }

      $('.calendar').append(`<div class="day ${weekend ? "weekend" : ""}">${name}   <button class="btn-show-calender">${day}</button>  </div>`);
    }

    const data = this.schedule;
    
    $.each(data, function(i, name) {
    alert(item.name);
    });

  }
}