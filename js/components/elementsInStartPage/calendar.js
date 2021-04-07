import { isWeekend, getDaysInMonth, getCurrentMonthInNumber, getCurrentYear, getThePickedMonth, calcStartDayOfSpecificMonth } from "./date-helper.js";
import { renderInfoIntoSalons, buildStructurOfBothSalonsIntoCalendar } from "./littleAndBigSalon-calendar.js";

var pickedMonthInCalandar = getCurrentMonthInNumber();

export default class Calendar {

  constructor() {
    this.eventHandeler();
  }

  render(schedule, movieInfo) {
    this.schedule = schedule;
    this.movieInfo = movieInfo;
    this.buildCalendar();
    buildStructurOfBothSalonsIntoCalendar();
  }

  buildCalendar() {

    $("main").append(`

    <div class="calendar_title">Boka platser</div>
    <div class="calendar-Container">      
      <div class="calendar"></div>        
    </div >`);

    $('.calendar').html(`<div class="selectedMonth_container"></div>`);
    $('.selectedMonth_container').html(`<button class="btn_previousMonth"><</button>`);
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

    this.renderDatesInCalendar(pickedMonthInCalandar);
  }

  eventHandeler() {
    $('main').on("click", ".btn-show-calender", (event) => this.renderSaloonInfo(event));
    $('main').on("click", ".btn_previousMonth", (event) => this.pressingBtnPreviousMonth(event));
    $('main').on("click", ".btn_nextMonth", (event) => this.pressingBtnNextMonth(event));
  }

  renderSaloonInfo(event) {

    console.log(event)

    let pickedDate = event.target.value;
    let temporarilyMovieList = [];

    //Adding all movies that plays on the picked date into a temporarily array.
    this.schedule.forEach(movie => {
      if (movie.date === pickedDate) {
        temporarilyMovieList.push(movie);
      }
    });

    renderInfoIntoSalons(temporarilyMovieList);

  }

  //Pressing previous month button in calendar module.
  pressingBtnPreviousMonth() {

    console.log(pickedMonthInCalandar)

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

    console.log(pickedMonthInCalandar)

    if (pickedMonthInCalandar > 0 && pickedMonthInCalandar < 12) {

      $('.day').replaceWith("");
      $('.notAvailable').replaceWith("");

      pickedMonthInCalandar++;
      $('.selectedMonth').html(`<div class="selectedMonth"><p> ${getThePickedMonth(pickedMonthInCalandar)} </p></div>`);

      this.renderDatesInCalendar(pickedMonthInCalandar);
    }
  }

  //This function calculates how many days it should render per month. It also calculates what weekday a month starts with. 
  renderDatesInCalendar(selectedMonth) {

    let howManyDaysToLoop = getDaysInMonth(selectedMonth);

    let howManyDaysToSkip = calcStartDayOfSpecificMonth(selectedMonth);

    let dates = [];

    let day = 0;

    //Adds empty "boxes" at start of the calendar 
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







