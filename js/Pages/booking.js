export default class Booking {

  constructor(changeListener) {
    this.file
    this.changeListener = changeListener;
    this.addEventHandlers();
  }

  addEventHandlers() {
    // Listen to clicks on the add person button => run addPerson
    $('body').on('click', '.seating-container input[type="checkbox"] + label', () => this.updateBookingJSON(this.file));
    // Listen to changes to persons.json => run read
    this.changeListener.on(this.file, () => this.reRender(this.file));
  }

  async read(file) {
    // Read data from a JSON file
    this.showingDetails = await JSON._load(file);
    console.log('Read');
    console.table(this.showingDetails);
  }

  // custom method for rerendering without route change
  reRender(file) {
    this.read(file);
    $('main').html(this.render(file));
  }

  async render(file) {
    this.file = file;
    console.log('rendering')
    if (!this.showingDetails) {
      await this.read(file)
    }
    let layout = /*html*/`
      <div class="seating-container">
        <div class="screen-row">
          <h1>SKÄRM</h1>
        </div>
    `
    for (let i = 0; i < this.showingDetails[0].seating.length; i++) {
      layout += /*html*/`
        <div class="row">
      `
      for (let j = 0; j < this.showingDetails[0].seating[i].length; j++) {
        let id = String.fromCharCode(65 + i) + " " + (j + 1);
        if (this.showingDetails[0].seating[i][j] === 0) {
          layout += /*html*/`
            <input type="checkbox" id='${id}'>
            <label for='${id}'></label>
          `
        } else if (this.showingDetails[0].seating[i][j] === 1) {
          layout += /*html*/`
            <input type="checkbox" id='${id}' checked>
            <label for='${id}'></label>
          `
        } else {
          layout += /*html*/`
            <input type="checkbox" id='${id}' disabled>
            <label for='${id}'></label>
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

  async updateBookingJSON(file) {
    let checkboxes = document.querySelectorAll('.seating-container input[type = "checkbox"]');
    let count = 0;
    console.table(checkboxes);
    for (let i = 0; i < this.showingDetails[0].seating.length; i++) {
      for (let j = 0; j < this.showingDetails[0].seating[i].length; j++) {
        if (checkboxes[count].disabled == true) {
          this.showingDetails[0].seating[i][j] = 2;
        } else if (checkboxes[count].checked == true) {
          this.showingDetails[0].seating[i][j] = 1;
        } else {
          this.showingDetails[0].seating[i][j] = 0;
        }
        count++;
      }
    }
    // Save the data to a JSON file
    await JSON._save(file, this.showingDetails);
    console.log('Saved');
  }

}