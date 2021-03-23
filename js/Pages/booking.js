export default class Booking {

  constructor(changeListener) {
    this.setSessionStorage();
    /* this.file is the showing JSON file that is being read at a given time */
    this.file;
    /* this.latestBookedSeats is an array of seats that are being booked this session */
    this.latestBookedSeats = [];
    this.changeListener = changeListener;
    this.addEventHandlers();
  }

  addEventHandlers() {
    // Listen to changes on checkboxes => run updateBookingJSON
    $('body').on('change', '.seating-container input[type="checkbox"]', (event) => this.updateBookingJSON(event));
    // Listen to changes on the booking button => run confirmBookingJSON
    $('body').on('click', '.seating-container .booking-btn', () => this.confirmBookingJSON());
  }

  async read() {
    // Read data from a JSON file
    this.showingDetails = await JSON._load(this.file);
  }

  // custom method for rerendering without route change
  async reRender() {
    /* if we're there's no booking file specified, go back to home page */
    if (!this.file) {
      document.location.href = "/";
    }
    await this.read();
    $('main').append(this.render(this.file));
  }

  async render(file) {
    /* if we're there's no booking file specified, go back to home page */
    if (!file) {
      if (this.tempStore.bookingFile) {
        this.file = this.tempStore.bookingFile;
      } else {
        document.location.href = "/";
      }
    }
    /* if we're accessing a different booking file, read new file and add change listener */
    /* also remove change listener from old file */
    if (this.file !== file) {
      this.latestBookedSeats = [];//clear the array that keeps track of seats being booked
      this.changeListener.remove(this.file);//remove old file listener
      if (file) {
        this.file = 'booking/' + file;//update file we're looking at
      }
      this.tempStore.bookingFile = this.file;
      this.tempStore.save();
      await this.read(file);//read new file
      this.changeListener.on(this.file, () => this.reRender());//add listener on new file
    }
    /* add heading part of seating chart */
    let layout = /*html*/`
      <div class="seating-container">
        <div class="buffer"></div>
        <div class="movie-details-row">
          <em>${this.showingDetails[0].film}: ${this.showingDetails[0].date} (${this.showingDetails[0].time})</em>
        </div>
        <div class="screen-row">
          <div></div>
          <h1>SKÄRM</h1>
          <div></div>
        </div>
        <div class="seating-rows-container">
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
        } else if (this.showingDetails[0].seating[i][j] === 1 && (this.latestBookedSeats.length > 0 && this.latestBookedSeats.includes(id))) {
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
        </div>
        <div class="text-row">
          <em>Välj din plats</em>
        </div>
        <div class="button-row">
          <a class="booking-btn" href="#confirmation">BOKA NU</a>
        </div>
        <div class="buffer"></div>
      </div>
    `

    return layout;
  }

  async updateBookingJSON(event) {
    let checkbox = event.target;
    let seatID = checkbox.id;
    let value = seatID;
    /* convert the ticket number (value) into the index numbers used in the seating chart array */
    value = value.split(" ");
    value[0] = value[0].charCodeAt(0) - 65;
    value[1]--;

    /* update the status of the checkbox (seat) in the seating chart array */
    if (checkbox.disabled == true) {
      this.showingDetails[0].seating[value[0]][value[1]] = 2;
    } else if (checkbox.checked == true) {
      this.showingDetails[0].seating[value[0]][value[1]] = 1;
      this.latestBookedSeats.push(seatID);/* add this seat to this session's array */
    } else {
      this.showingDetails[0].seating[value[0]][value[1]] = 0;
      this.remove(this.latestBookedSeats, seatID);/* remove this seat from this session's array */
    }
    console.log(this.latestBookedSeats);
    // Save the data to a JSON file
    await JSON._save(this.file, this.showingDetails);
  }

  async confirmBookingJSON() {
    /* loop through array and turn any unconfirmed bookings into confirmed bookings */
    for (let i = 0; i < this.showingDetails[0].seating.length; i++) {
      for (let j = 0; j < this.showingDetails[0].seating[i].length; j++) {
        let id = String.fromCharCode(65 + i) + " " + (j + 1);
        if (this.showingDetails[0].seating[i][j] === 1 && (this.latestBookedSeats.length > 0 && this.latestBookedSeats.includes(id))) {
          this.showingDetails[0].seating[i][j] = 2;
        }
      }
    }

    // Save the data to a JSON file
    await JSON._save(this.file, this.showingDetails);

    let bookedShows = ({
      auditorium: this.showingDetails[0].auditorium,
      film: this.showingDetails[0].film,
      date: this.showingDetails[0].date,
      time: this.showingDetails[0].time,
      seats: this.latestBookedSeats
    });

    /* create an array of all accounts and add the latest booking information to the appropriate account */
    let accounts = await this.addTicketArray(bookedShows);
    /* save all accounts back to accounts JSON */
    await JSON._save('account.json', accounts);
  }

  /* utility function for removing a value from an array */
  remove(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        array.splice(i, 1);
      }
    }
  }

  /* search the account.json file for the appropriate user and add booking details to their bookedShows variable */
  async addTicketArray(bookedShows) {
    let accounts = await JSON._load('account.json');

    for (let i = 0; i < accounts.length; i++) {
      /* find active user in account.json */
      if (accounts[i].Email === window.activeUser.Email) {
        /* if there are already bookings for this showing, append most recent booking */
        let identical = false;
        for (let j = 0; j < accounts[i].bookedShows.length; j++) {
          if (accounts[i].bookedShows[j].auditorium === bookedShows.auditorium && accounts[i].bookedShows[j].film === bookedShows.film && accounts[i].bookedShows[j].date === bookedShows.date && accounts[i].bookedShows[j].time === bookedShows.time) {
            for (let k = 0; k < bookedShows.seats.length; k++) {
              accounts[i].bookedShows[j].seats.push(bookedShows.seats[k]);
            }
            accounts[i].bookedShows[j].seats.sort;
            identical = true;
          }
        }
        /* if there are no other bookings for this showing, simply add the booking information to the account */
        if (!identical) {
          accounts[i].bookedShows.push(bookedShows);
        }

        return accounts;
      }
    }

    return null;
  }

  setSessionStorage() {
    this.tempStore = {};
    try {
      this.tempStore = JSON.parse(sessionStorage.store);
    } catch (e) { }
    this.tempStore.save = function () {
      sessionStorage.store = JSON.stringify(this);
    }
  }

}