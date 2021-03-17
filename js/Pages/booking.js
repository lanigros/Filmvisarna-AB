export default class Booking {

  async render(file) {
    let showingDetails = await $.getJSON(file);
    let layout = /*html*/`
      <div class="seating-container">
        <div class="screen-row">
          <h1>SKÄRM</h1>
        </div>
    `
    for (let i = 0; i < showingDetails[0].seating.length; i++) {
      layout += /*html*/`
        <div class="row">
      `
      for (let j = 0; j < showingDetails[0].seating[i].length; j++) {
        if (showingDetails[0].seating[i][j] === 0) {
          layout += /*html*/`
            <input type="checkbox" id='${String.fromCharCode(65 + i) + " " + j}'>
            <label for='${String.fromCharCode(65 + i) + " " + j}'></label>
          `
        } else if (showingDetails[0].seating[i][j] === 1 || showingDetails[0].seating[i][j] === 2) {
          layout += /*html*/`
            <input type="checkbox" disabled>
            <label></label>
          `
        }
      }
      layout += /*html*/`
        </div>
      `
    }

    layout += /*html*/`
        <div class="text-row">
          <em>Välj din plats</em>
        </div>
      </div>
    `

    return layout;
  }

}