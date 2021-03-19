import { isWeekend, getDaysInMonth, getCurrentMonthInNumber, getCurrentMonthInString, getCurrentYear, getThePickedMonth, calcStartDayOfSpecificMonth } from "./date-helper.js";
import { buildLittleSalon, renderInfoIntoLittleSalon, clearInfoOnLittleSalon } from "./littleAndBigSalon-calendar.js";

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
          <div class="lilla-salongen-container"></div>
          <div class="stora-salongen-container"></div>
      </div >`);

    $('.calendar').append(`<div class="selectedMonth_container"></div>`);
    $('.selectedMonth_container').append(`<button class="btn_previousMonth"><</button>`);
    $('.selectedMonth_container').append(`<div class="selectedMonth"> <p>${getThePickedMonth(pickedMonthInCalandar)}</p> </div>`);
    $('.selectedMonth_container').append(`<button class="btn_nextMonth"> > </button>`);

    $('.calendar').append(`<div class="nameOfDay_container"></div>`);
    $('.nameOfDay_container').append(`<div class="nameOfDay"><p> Mon </p> </div>`);
    $('.nameOfDay_container').append(`<div class="nameOfDay"><p> Tue </p> </div>`);
    $('.nameOfDay_container').append(`<div class="nameOfDay"><p> Wed </p> </div>`);
    $('.nameOfDay_container').append(`<div class="nameOfDay"><p> Thu </p> </div>`);
    $('.nameOfDay_container').append(`<div class="nameOfDay"><p> Fri </p> </div>`);
    $('.nameOfDay_container').append(`<div class="nameOfDay"><p> Sat </p> </div>`);
    $('.nameOfDay_container').append(`<div class="nameOfDay"><p> Sun </p> </div>`);

    buildLittleSalon();

    this.renderDatesInCalendar(pickedMonthInCalandar);
  }


  eventHandeler() {
    $('main').on("click", ".btn-show-calender", (event) => this.renderSaloonInfo(event));
    $('main').on("click", ".btn_previousMonth", (event) => this.pressingBtnPreviousMonth(event));
    $('main').on("click", ".btn_nextMonth", (event) => this.pressingBtnNextMonth(event));
  }

  renderSaloonInfo(event) {
    /* console.log(event); */

    clearInfoOnLittleSalon();

    let pickedDate = event.target.value;
    let temporarilyMovieList = [];

    this.schedule.forEach(movie => {
      if (movie.date === pickedDate) {
        temporarilyMovieList.push(movie);
      }
    });

    console.log(temporarilyMovieList)
    renderInfoIntoLittleSalon(temporarilyMovieList);


    /* 
        this.schedule.forEach(detailedMovieInfo => {
    
          if (test === detailedMovieInfo.date) {
    
            
    
            console.log('I salong : ', detailedMovieInfo.auditorium)
            console.log('Film som spelas : ', detailedMovieInfo.film)
            console.log('Tid: ', detailedMovieInfo.time)
            console.log('Datum : ', detailedMovieInfo.date)
            console.log('Dagen : ', detailedMovieInfo.weekday)
          }
        }); */

  }

  pressingBtnPreviousMonth() {

    if (pickedMonthInCalandar > 1 && pickedMonthInCalandar <= 13) {

      $('.day').replaceWith("");
      $('.notAvailable').replaceWith("");

      pickedMonthInCalandar--;
      calcStartDayOfSpecificMonth(pickedMonthInCalandar);
      $('.selectedMonth').html(`<div class="selectedMonth"><p> ${getThePickedMonth(pickedMonthInCalandar)}</p> </div>`);

      this.renderDatesInCalendar(pickedMonthInCalandar);

    }

  }

  pressingBtnNextMonth() {

    if (pickedMonthInCalandar >= 1 && pickedMonthInCalandar < 12) {

      $('.day').replaceWith("");
      $('.notAvailable').replaceWith("");

      pickedMonthInCalandar++;
      $('.selectedMonth').html(`<div class="selectedMonth"><p> ${getThePickedMonth(pickedMonthInCalandar)} </p></div>`);

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
      $('.calendar').append(`<div class="notAvailable"></div>`);
    }

    //Adding all 31 days in month into "calendar_Container" with own divs.
    for (let i = 1; i <= howManyDaysToLoop; i++) {

      day++;

      const weekend = isWeekend(day);

      //Converts the date to format "2021-04-01" wich is needed for JSON
      let datum = new Date(getCurrentYear(), selectedMonth - 1, day + 1).toISOString().split('T')[0];

      dates.push(datum);

      $('.calendar').append(`<div class="day ${weekend ? "weekend" : ""}"> <button value="${datum}" class="btn-show-calender">${day}</button> </div>`);


    }
  }



}







