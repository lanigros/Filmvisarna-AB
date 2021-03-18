

function buildLittleSalon(jsonList) {

  $('.lilla-salongen-container').append(`
    <div class="date>
    <p>Datum: </p>
    </div>

          ${jsonList.date}
          ${jsonList.film}


        `
  )

}














export { buildLittleSalon };