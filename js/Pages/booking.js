export default class Booking {

  constructor(changeListener) {
    /* this.file is the file the showing JSON file that is being ready at a given time */
    this.file;
    this.changeListener = changeListener;
    this.addEventHandlers();
  }

  addEventHandlers() {
    // Listen to changes on checkboxes => run updateBookingJSON
    $('body').on('change', '.seating-container input[type="checkbox"]', (event) => this.updateBookingJSON(event));
  }

  async read() {
    // Read data from a JSON file
    this.showingDetails = await JSON._load(this.file);
  }

  // custom method for rerendering without route change
  async reRender() {
    await this.read();
    $('main').append(this.render(this.file));
  }

  async render(file) {
    /* if we're accessing a different file, read new file and add change listener */
    /* also remove change listener from old file */
    if (this.file !== file) {
      this.changeListener.remove(this.file);//remove old file listener
      this.file = file;//update file we're looking at
      await this.read(file);//read new file
      this.changeListener.on(this.file, () => this.reRender());//add listener on new file
    }
    /* add heading part of seating chart */
    let layout = /*html*/`
      <div class="seating-container">
        <div class="screen-row">
          <h1>SKÄRM</h1>
        </div>
    `
    /* add seating/checkboxes part of seating chart */
    for (let i = 0; i < this.showingDetails[0].seating.length; i++) {
      layout += /*html*/`
        <div class="row">
      `
      for (let j = 0; j < this.showingDetails[0].seating[i].length; j++) {
        /* convert i and j into the ticket number for a seat */
        /* this can be used for the checkbox ID among other things */
        let id = String.fromCharCode(65 + i) + " " + (j + 1);
        /* populate seat if available */
        if (this.showingDetails[0].seating[i][j] === 0) {
          layout += /*html*/`
            <input type="checkbox" id='${id}'>
            <label for='${id}'></label>
          `
          /* populate seat if currently being selected */
        } else if (this.showingDetails[0].seating[i][j] === 1) {
          layout += /*html*/`
            <input type="checkbox" id='${id}' checked>
            <label for='${id}'></label>
          `
          /* populate seat if already taken */
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
    /* closing tags and footer part of seating chart */
    layout += /*html*/`
        <div class="text-row">
          <em>Välj din plats</em>
        </div>
      </div>
    `

    return layout;
  }

  async updateBookingJSON(event) {
    let checkbox = event.target;
    let value = checkbox.id;
    /* convert the ticket number (value) into the index numbers used in the seating chart array */
    value = value.split(" ");
    value[0] = value[0].charCodeAt(0) - 65;
    value[1]--;

    /* update the status of the checkbox (seat) in the seating chart array */
    if (checkbox.disabled == true) {
      this.showingDetails[0].seating[value[0]][value[1]] = 2;
    } else if (checkbox.checked == true) {
      this.showingDetails[0].seating[value[0]][value[1]] = 1;
    } else {
      this.showingDetails[0].seating[value[0]][value[1]] = 0;
    }
    // Save the data to a JSON file
    await JSON._save(this.file, this.showingDetails);
  }

}