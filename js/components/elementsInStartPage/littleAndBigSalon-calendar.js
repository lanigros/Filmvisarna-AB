

function buildLittleSalon() {

  console.log("written by: buildLittleSalon")

  $('.lilla-salongen-container').append(`
    <div class="titleOfSalon"> <h1> Lilla salongen</h1>
      <div class="txtholder-date-litleSalon"></div>
      <div class="txtholder-movieTitle-litleSalon"></div>
    </div>      

  `
  );
}

function renderInfoIntoLittleSalon(jsonFile) {

  $('.txtholder-date-litleSalon').append(`    
    <p>Datum: ${jsonFile[0].date}</p>
  `
  );

  jsonFile.forEach(movie => {

    console.log("yoo");

    if (movie.auditorium === "Lilla Salongen") {

      $('.txtholder-movieTitle-litleSalon').append(`
      <p>${movie.film}</p>
      `)

    }

  });
}

function clearInfoOnLittleSalon() {
  $('.txtholder-date-litleSalon p').replaceWith("");
  $('.txtholder-movieTitle-litleSalon p').replaceWith("");
}


export { buildLittleSalon, renderInfoIntoLittleSalon, clearInfoOnLittleSalon };