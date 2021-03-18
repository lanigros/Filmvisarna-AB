import { isWeekend, getDaysInMonth, getCurrentMonthInNumber, getCurrentMonthInString, getCurrentYear, getThePickedMonth, calcStartDayOfSpecificMonth } from "./date-helper.js";

var pickedMonthInCalandar = getCurrentMonthInNumber();
console.log("start:", pickedMonthInCalandar)

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
    $('.selectedMonth_container').append(`<div class="selectedMonth" value="${getCurrentMonthInNumber() + 1}"> ${getThePickedMonth(pickedMonthInCalandar)} </div>`);
    $('.selectedMonth_container').append(`<button class="btn_nextMonth"> show next month> </button>`);

    $('.calendar').append(`<div class="nameOfDay"> Mon </div>`);
    $('.calendar').append(`<div class="nameOfDay"> Tue </div>`);
    $('.calendar').append(`<div class="nameOfDay"> Wed </div>`);
    $('.calendar').append(`<div class="nameOfDay"> Thu </div>`);
    $('.calendar').append(`<div class="nameOfDay"> Fri </div>`);
    $('.calendar').append(`<div class="nameOfDay"> Sat </div>`);
    $('.calendar').append(`<div class="nameOfDay"> Sun </div>`);

    this.renderDatesInCalendar(pickedMonthInCalandar);
  }

  eventHandeler() {
    $('main').on("click", ".btn-show-calender", (event) => this.renderSaloonInfo(event));
    $('main').on("click", ".btn_previousMonth", (event) => this.pressingBtnPreviousMonth(event));
    $('main').on("click", ".btn_nextMonth", (event) => this.pressingBtnNextMonth(event));
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

  pressingBtnPreviousMonth() {

    if (pickedMonthInCalandar > 1 && pickedMonthInCalandar <= 13) {

      $('.day').replaceWith("");
      $('.notAvailable').replaceWith("");

      pickedMonthInCalandar--;
      calcStartDayOfSpecificMonth(pickedMonthInCalandar);
      $('.selectedMonth').html(`<div class="selectedMonth" value="${getCurrentMonthInNumber() + 1}"> ${getThePickedMonth(pickedMonthInCalandar)} </div>`);

      this.renderDatesInCalendar(pickedMonthInCalandar);

    }

  }

  pressingBtnNextMonth() {

    if (pickedMonthInCalandar >= 1 && pickedMonthInCalandar < 12) {

      $('.day').replaceWith("");
      $('.notAvailable').replaceWith("");

      pickedMonthInCalandar++;
      $('.selectedMonth').html(`<div class="selectedMonth" value="${getCurrentMonthInNumber() + 1}"> ${getThePickedMonth(pickedMonthInCalandar)} </div>`);

      this.renderDatesInCalendar(pickedMonthInCalandar);

    }
  }

  //This function calculates how many days it should render per month. It also calculates what weekday the month starts with. 
  renderDatesInCalendar(selectedMonth) {
    console.log("Fired from renderDatesInCalendar");
    console.log("SelectedMonth = ", selectedMonth)

    let howManyDaysToLoop = getDaysInMonth(selectedMonth);
    console.log("howManyDaysInMonth:", howManyDaysToLoop)

    let howManyDaysToSkip = calcStartDayOfSpecificMonth(selectedMonth);
    console.log("howManyDaysToSkip: ", howManyDaysToSkip)

    let dates = [];
    console.log("Array", dates)

    let day = 0;

    for (let i = howManyDaysToSkip; i > 0; i--) {
      $('.calendar').append(`<div class="notAvailable"> - </div>`);
    }

    //Adding all 31 days in month into "calendar_Container" with own divs.
    for (let i = 1; i <= 31; i++) {

      day++;

      const weekend = isWeekend(day);

      //Converts the date to format "2021-04-01" wich is needed for JSON
      let datum = new Date(getCurrentYear(), selectedMonth - 1, day + 1).toISOString().split('T')[0];

      dates.push(datum);

      $('.calendar').append(`<div class="day ${weekend ? "weekend" : ""}"> <button value="${datum}" class="btn-show-calender">${day}</button> </div>`);


    }
  }

}







