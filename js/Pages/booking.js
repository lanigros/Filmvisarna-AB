export default class Booking {

  constructor(changeListener) {
    this.changeListener = changeListener;
    this.addEventHandlers();
  }

  addEventHandlers() {
    // Listen to changes on checkboxes => run updateBookingJSON
    $('body').on('change', '.seating-container input[type="checkbox"]', (event) => this.updateBookingArray(event));
    // Listen to changes on the booking button => run confirmBookingJSON
    $('body').on('click', '.seating-container .booking-btn', () => this.confirmBookingJSON());
  }

  async read() {
    this.tempStore.bookingShowingDetails = (await JSON._load(this.tempStore.bookingFile))[0];
    this.tempStore.save();
  }

  // custom method for rerendering without route change
  async reRender() {
    if (document.location.href !== "#booking") {
      return;
    }
    $('main').append(await this.render());
  }

  async render() {
    // set the session storage during each render so that information is up-to-date
    this.setSessionStorage();
    // if there was a conflicting booking when trying to confirm, alert the user
    // note that this variable is set in the confirmBookingJSON function
    if (this.conflictingBooking) {
      this.conflictingBooking = false;
      setTimeout(function () { alert("En eller flera bokningar gjordes av någon annan"); }, 100); // delay so that the booking page reloads instead of stopping on the confirmation page
    }
    // if we're there's no booking file specified, go back to home page
    if (!this.tempStore.bookingFile) {
      document.location.href = "/";
      return;
    }
    // if this is a new booking file, add event handler and reset session variables
    if (this.tempStore.bookingFileHasChanged) {
      this.tempStore.bookingLatestBookedSeats = []; // contains tickets that are being or were recently booked
      this.tempStore.bookingUnconfirmedSeatingSelection = (await JSON._load(this.tempStore.bookingFile))[0].seating; // contains the seating chart not yet saved to the JSON
      this.tempStore.bookingFileHasChanged = false;
      this.tempStore.save();
    }
    // add change listener for booking file if not present
    if (!this.changeListener.contains(this.tempStore.bookingFile)) {
      this.changeListener.on(this.tempStore.bookingFile, () => this.reRender());
    }
    // if the user is not logged in, go to login page
    if (!window.activeUser) {
      document.location.href = "#login";
      return;
    }

    await this.read(this.tempStore.bookingFile);

    /* add heading part of seating chart */
    let layout = /*html*/`
      <div class="seating-container">
        <div class="buffer"></div>
        <div class="movie-details-row">
          <em>${this.tempStore.bookingShowingDetails.film}: ${this.tempStore.bookingShowingDetails.date} (${this.tempStore.bookingShowingDetails.time})</em>
        </div>
        <div class="screen-row">
          <div></div>
          <h1>SKÄRM</h1>
          <div></div>
        </div>
        <div class="seating-rows-container">
    `
    /* add seating/checkboxes part of seating chart */
    for (let i = 0; i < this.tempStore.bookingUnconfirmedSeatingSelection.length; i++) {
      layout += /*html*/`
        <div class="row">
      `
      for (let j = 0; j < this.tempStore.bookingUnconfirmedSeatingSelection[i].length; j++) {
        /* convert i and j into the ticket number for a seat */
        /* this can be used for the checkbox ID among other things */
        let id = String.fromCharCode(65 + i) + " " + (j + 1);
        /* populate seat if unavailable */
        /* note that we can look at either the bookingShowingDetails or bookingUnconfirmedSeatingSelection variables for this, but we choose to look at bookingShowingDetails since this is the source of truth for confirmed bookings */
        if (this.tempStore.bookingShowingDetails.seating[i][j] === 2) {
          if (this.tempStore.bookingUnconfirmedSeatingSelection[i][j] !== 2) {
            this.remove(this.tempStore.bookingLatestBookedSeats, id);
            this.tempStore.bookingUnconfirmedSeatingSelection[i][j] = 2;
            this.tempStore.save();
          }
          layout += /*html*/`
            <input type="checkbox" id='${id}' disabled>
            <label for='${id}'></label>
          `
        } else if (this.tempStore.bookingUnconfirmedSeatingSelection[i][j] === 1) {
          layout += /*html*/`
            <input type="checkbox" id='${id}' checked>
            <label for='${id}'></label>
          `
        } else {
          layout += /*html*/`
            <input type="checkbox" id='${id}'>
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

  async updateBookingArray(event) {
    let checkbox = event.target;
    let seatID = checkbox.id;
    let value = seatID;
    /* convert the ticket number (value) into the index numbers used in the seating chart array */
    value = value.split(" ");
    value[0] = value[0].charCodeAt(0) - 65;
    value[1]--;

    /* update the status of the checkbox (seat) in the seating chart array */
    if (checkbox.disabled == true) {
      this.tempStore.bookingUnconfirmedSeatingSelection[value[0]][value[1]] = 2;
      this.remove(this.tempStore.bookingLatestBookedSeats, seatID);
    } else if (checkbox.checked == true) {
      this.tempStore.bookingUnconfirmedSeatingSelection[value[0]][value[1]] = 1;
      this.tempStore.bookingLatestBookedSeats.push(seatID);
    } else {
      this.tempStore.bookingUnconfirmedSeatingSelection[value[0]][value[1]] = 0;
      this.remove(this.tempStore.bookingLatestBookedSeats, seatID);
    }
    this.tempStore.save();
  }

  async confirmBookingJSON() {
    await this.read(); // make sure that our data is up-to-date with the JSON

    this.conflictingBooking = false;

    /* first, loop through array and determine if there are any booking conflicts */
    for (let i = 0; i < this.tempStore.bookingUnconfirmedSeatingSelection.length; i++) {
      for (let j = 0; j < this.tempStore.bookingUnconfirmedSeatingSelection[i].length; j++) {
        let id = String.fromCharCode(65 + i) + " " + (j + 1);
        if (this.tempStore.bookingUnconfirmedSeatingSelection[i][j] === 1) {
          if (this.tempStore.bookingShowingDetails.seating[i][j] === 2) {
            this.remove(this.tempStore.bookingLatestBookedSeats, id);
            this.conflictingBooking = true;
          }
        }
      }
    }
    this.tempStore.save();

    if (this.conflictingBooking) {
      document.location.href = "#booking";
      return;
    }

    // if no bookings were made, reload page
    if (this.tempStore.bookingLatestBookedSeats.length < 1) {
      document.location.href = "#booking";
      return;
    }

    /* now, since there are no conflits, loop through array and turn any unconfirmed bookings into confirmed bookings */
    for (let i = 0; i < this.tempStore.bookingUnconfirmedSeatingSelection.length; i++) {
      for (let j = 0; j < this.tempStore.bookingUnconfirmedSeatingSelection[i].length; j++) {
        let id = String.fromCharCode(65 + i) + " " + (j + 1);
        if (this.tempStore.bookingUnconfirmedSeatingSelection[i][j] === 1) {
          this.tempStore.bookingUnconfirmedSeatingSelection[i][j] = 2;
          this.tempStore.bookingShowingDetails.seating[i][j] = 2;
        }
      }
    }
    this.tempStore.save();

    let temp = [];
    temp.push(this.tempStore.bookingShowingDetails);

    await JSON._save(this.tempStore.bookingFile, temp);

    /* the following steps are to save the bookings to the user in the accounts JSON */
    let bookedShows = ({
      auditorium: this.tempStore.bookingShowingDetails.auditorium,
      film: this.tempStore.bookingShowingDetails.film,
      date: this.tempStore.bookingShowingDetails.date,
      time: this.tempStore.bookingShowingDetails.time,
      seats: this.tempStore.bookingLatestBookedSeats
    });

    /* create an array of all accounts and add the latest booking information to the appropriate account */
    let accounts = await this.addTicketArray(bookedShows);
    /* save all accounts back to accounts JSON */
    await JSON._save('account.json', accounts);

    /* turn this this variable so that the confirmation page will display once and only once */
    this.tempStore.bookingLatestBookedSeats = [];
    this.tempStore.save();
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