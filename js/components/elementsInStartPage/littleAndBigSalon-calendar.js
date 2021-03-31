// imported utility classes
import FileFunctions from "/js/fileFunctions.js";

function buildStructurOfBothSalonsIntoCalendar() {

  $('.calendar-Container').append(`<div class="bothSalons-container"></div>`);

  $('.bothSalons-container').append(`
  <div class="little-salon-container">
    <div class="titleOfSalon"> <h1> Lilla salongen</h1></div>
    <div class="movieInfo-container-calendarSalon">
      <div class="txtholder-movieDate-calendarSalon"></div>
      <div class="txtholder-movieTitle-calendarSalon"></div>
      <div class="txtholder-movieTime-calendarSalon"></div>
    </div>
  </div>  
  `);

  $('.bothSalons-container').append(`
  <div class="big-salon-container">
    <div class="titleOfSalon"> <h1>Stora salongen</h1></div>
    <div class="movieInfo-container-calendarSalon">
      <div class="txtholder-movieDate-calendarSalon"></div>
      <div class="txtholder-movieTitle-calendarSalon"></div>
      <div class="txtholder-movieTime-calendarSalon"></div>
    </div>
  </div>
  `);
}

function renderInfoIntoSalons(jsonFile) {

  clearTheSalons();

  if (jsonFile.length === 0) {
    $('.little-salon-container').append(`      
      <div class="txtholder-movieTitle-calendarSalon">Tyvärr, inga filmer visas idag.</div>`);
    $('.big-salon-container').append(`      
      <div class="txtholder-movieTitle-calendarSalon">Tyvärr, inga filmer visas idag.</div>`);
    return;
  }

  $('.little-salon-container').append(`
    <div class="txtholder-movieDate-calendarSalon">
      <p>Datum: ${jsonFile[0].date}</p>
    </div>`);
  $('.big-salon-container').append(`
     <div class="txtholder-movieDate-calendarSalon">
      <p>Datum: ${jsonFile[0].date}</p>
    </div>`);

  jsonFile.forEach(movie => {

    if (movie.auditorium === "Lilla Salongen") {
      $('.little-salon-container').append(`      
      <div class="txtholder-movieTitle-calendarSalon"><p> ${movie.film} </p></div>
      <div class="txtholder-movieTime-calendarSalon"><p> ${movie.time}</p></div>
      <button class="btn-salon-calendar">
        <a class="link-to-booking-page" href="#booking" id="${FileFunctions.getBookingFile(movie.film, movie.auditorium, movie.date, movie.time)}">Boka</a>
      </button>
      <button class="btn-salon-calendar"><a href="#detailedInfoAboutMovie/${movie.film}/${movie.auditorium}/${movie.date}/${movie.time}">Om filmen</a></button>
      `)
    }

    if (movie.auditorium === "Stora Salongen") {
      $('.big-salon-container').append(`      
      <div class="txtholder-movieTitle-calendarSalon"><p> ${movie.film} </p></div>
      <div class="txtholder-movieTime-calendarSalon"><p> ${movie.time}</p></div>
      <button class="btn-salon-calendar">
        <a class="link-to-booking-page" href="#booking" id="${FileFunctions.getBookingFile(movie.film, movie.auditorium, movie.date, movie.time)}">Boka</a>
      </button>
      <button class="btn-salon-calendar"><a href="#detailedInfoAboutMovie/${movie.film}/${movie.auditorium}/${movie.date}/${movie.time}">Om filmen</a></button>
      `)
    }

  });
}

function clearTheSalons() {

  console.log("clearTheSalons function:");

  $('.little-salon-container').html(`
    <div class="titleOfSalon"> <h1>Lilla salongen</h1></div>    
  `)

  $('.big-salon-container').html(`
    <div class="titleOfSalon"> <h1>Stora salongen</h1></div> 
  `)
}

export { buildStructurOfBothSalonsIntoCalendar, renderInfoIntoSalons };