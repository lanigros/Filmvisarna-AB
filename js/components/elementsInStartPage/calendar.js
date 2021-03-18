import { isWeekend, getDayName, daysInMonth } from "./date-helper.js";

export default class Calendar {

  constructor() {
    this.eventHandeler();
  }

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

  buildCalendar() {

    $("main").append(`
    <div class="calendar-Container">
          <div class="calendar"></div>
          <div class="lilla-salongen-container"><h1>Lilla salongen</h1></div>
          <div class="stora-salongen-container"><h1>Stora salongen</h1></div>
      </div >`);

    $('.calendar').append(`<div class="selectedMonth_container"></div>`);
    $('.selectedMonth_container').append(`<button class="btn_previousMonth"> < show previous month </button>`);
    $('.selectedMonth_container').append(`<div class="selectedMonth"> Feb </div>`);
    $('.selectedMonth_container').append(`<button class="btn_nextMonth"> show next month> </button>`);

    $('.calendar').append(`<div class="nameOfDay"> Mon </div>`);
    $('.calendar').append(`<div class="nameOfDay"> Tue </div>`);
    $('.calendar').append(`<div class="nameOfDay"> Wed </div>`);
    $('.calendar').append(`<div class="nameOfDay"> Thu </div>`);
    $('.calendar').append(`<div class="nameOfDay"> Fri </div>`);
    $('.calendar').append(`<div class="nameOfDay"> Sat </div>`);
    $('.calendar').append(`<div class="nameOfDay"> Sun </div>`);

    //This loop sets the
    for (let i = 0; i < 7; i++) {

      let datum = new Date(2021, 3, i);
      let x = datum.getMonth();
      console.log(datum)
      console.log("x =", x);
      console.log(daysInMonth(2021, x));

    }

    let dates = [];
    console.log(dates)

    let day = 0;

    //Adding all 31 days in month into "calendar_Container" with own divs.
    for (let i = 1; i <= 34; i++) {

      day++;

      if (i < 4) {
        $('.calendar').append(`<div class="notAvailable">  </div>`);
        day--;
        continue;
      }

      const weekend = isWeekend(day);

      let datum = new Date(2021, 3, day + 1).toISOString().split('T')[0];

      dates.push(datum);

      $('.calendar').append(`<div class="day ${weekend ? "weekend" : ""}"> <button value="${datum}" class="btn-show-calender">${day}</button> </div>`);
    }

  }

  eventHandeler() {
    $('main').on("click", ".btn-show-calender", (event) => this.renderSaloonInfo(event));
    $('main').on("click", ".btn_previousMonth", (event) => this.renderSaloonInfo(event));
    $('main').on("click", ".btn_nexyMonth", (event) => this.renderSaloonInfo(event));
  }

  renderSaloonInfo(event) {
    console.log(event);
    let test = event.target.value;
    this.schedule.forEach(detailedMovieInfo => {

      if (test === detailedMovieInfo.date) {
        console.log('I salong : ', detailedMovieInfo.auditorium)
        console.log('Film som spelas : ', detailedMovieInfo.film)
        console.log('Tid: ', detailedMovieInfo.time)
        console.log('Datum : ', detailedMovieInfo.date)
        console.log('Dagen : ', detailedMovieInfo.weekday)
      }
    });

  }
}







