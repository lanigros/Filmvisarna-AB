import tempStore from '../tempStore.js';

export default class Booking {

  constructor(changeListener) {
    this.changeListener = changeListener;
    this.addEventHandlers();
  }

  addEventHandlers() {
    // Listen to changes on checkboxes => run updateBookingJSON
    $('body').on('change', '.seating-container input[type="checkbox"]', (event) => this.updateBookingArray(event));
    // Listen to changes on checkboxes => run updateAgeField
    $('body').on('change', '.seating-container input[type="checkbox"]', (event) => this.updateAgeField(event));
    // Listen to changes on the booking button => run confirmBookingJSON
    $('body').on('click', '.seating-container .booking-btn', () => this.confirmBookingJSON());
    // Listen to the minus buttons => run updateAgeMinus
    $('body').on('click', '.age-btn-minus', (event) => this.updateAgeMinus(event));
    // Listen to the plus buttons => run updateAgePlus
    $('body').on('click', '.age-btn-plus', (event) => this.updateAgePlus(event));
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
      document.location.href = "#";
      return;
    }
    // if this is a new booking file, add event handler and reset session variables
    if (this.tempStore.bookingFileHasChanged) {
      this.tempStore.bookingLatestBookedSeats = []; // contains tickets that are being or were recently booked
      this.tempStore.bookingChildAdultRetiree = [0, 0, 0]; // contains the number of child (index 0), adult (index 1), and retiree (index 2) tickets being booked
      this.tempStore.bookingUnconfirmedSeatingSelection = (await JSON._load(this.tempStore.bookingFile))[0].seating; // contains the seating chart not yet saved to the JSON
      this.tempStore.bookingFileHasChanged = false;
      this.tempStore.save();
    }
    // add change listener for booking file if not present
    if (!this.changeListener.contains(this.tempStore.bookingFile)) {
      this.changeListener.on(this.tempStore.bookingFile, () => this.reRender());
    }
    // if the user is not logged in, go to login page
    if (!tempStore.currentTester) {
      tempStore.bookingLoginRedirect = true; // set session storage to redirect back to the booking page after logging in
      tempStore.save();
      document.location.href = "#logIn";
      return;
    }

    tempStore.bookingLoginRedirect = false; // erase session storage on this variable since we're not redirecting to the login page
    tempStore.save();

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
            this.subtractPerson();
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
        <div class="age-btn-row">
    `
    layout += this.ageButtons();
    layout += /*html*/`
        </div>
        <div class="button-row">
          ${this.generateBookingPriceButton()}
        </div>
        <div class="buffer"></div>
      </div>
    `

    return layout;
  }

  ageButtons() {
    return /*html*/`
      <div class="single-age-container">
        <div class="age-btn-wrapper">
          <span class="age-btn-minus" id="child-minus">-</span>
          <div class="age-btn-value">${this.tempStore.bookingChildAdultRetiree[0]}</div>
          <span class="age-btn-plus" id="child-plus">+</span>
        </div>
        <p>Barn (0-15)</p>
      </div>
      <div class="single-age-container">
        <div class="age-btn-wrapper">
          <span class="age-btn-minus" id="adult-minus">-</span>
          <div class="age-btn-value">${this.tempStore.bookingChildAdultRetiree[1]}</div>
          <span class="age-btn-plus" id="adult-plus">+</span>
        </div>
        <p>Normal</p>
      </div>
      <div class="single-age-container">
        <div class="age-btn-wrapper">
          <span class="age-btn-minus" id="retiree-minus">-</span>
          <div class="age-btn-value">${this.tempStore.bookingChildAdultRetiree[2]}</div>
          <span class="age-btn-plus" id="retiree-plus">+</span>
        </div>
        <p>Pensionär</p>
      </div>
    `
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
      seats: this.tempStore.bookingLatestBookedSeats,
      price: (this.tempStore.bookingChildAdultRetiree[0] * 65) + (this.tempStore.bookingChildAdultRetiree[1] * 85) + (this.tempStore.bookingChildAdultRetiree[2] * 75)
    });

    bookedShows.seats.sort(); // sort the seating tickets for easier readability

    /* create an array of all accounts and add the latest booking information to the appropriate account */
    let accounts = await this.addTicketArray(bookedShows);
    /* save all accounts back to accounts JSON */
    await JSON._save('account.json', accounts);

    /* Update admin.json file with this booking */
    await this.updateAdminJSON(bookedShows);

    /* turn off this variable so that the confirmation page will display once and only once */
    this.tempStore.bookingLatestBookedSeats = [];
    this.tempStore.bookingChildAdultRetiree = [0, 0, 0];
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
      if (accounts[i].Email === tempStore.currentTester.Email) {
        /* if there are already bookings for this showing, append most recent booking */
        let identical = false;
        for (let j = 0; j < accounts[i].bookedShows.length; j++) {
          if (accounts[i].bookedShows[j].auditorium === bookedShows.auditorium && accounts[i].bookedShows[j].film === bookedShows.film && accounts[i].bookedShows[j].date === bookedShows.date && accounts[i].bookedShows[j].time === bookedShows.time) {
            for (let k = 0; k < bookedShows.seats.length; k++) {
              accounts[i].bookedShows[j].seats.push(bookedShows.seats[k]);
            }
            accounts[i].bookedShows[j].seats.sort();
            accounts[i].bookedShows[j].price += bookedShows.price; // update the price rather than overwrite or ignore it
            identical = true;
          }
        }
        /* if there are no other bookings for this showing, simply add the booking information to the account */
        if (!identical) {
          accounts[i].bookedShows.push(bookedShows);
        }

        tempStore.currentTester = accounts[i]; // save booking to logged-in user session storage
        tempStore.save();

        return accounts;
      }
    }

    return accounts;
  }

  /* A function to load and update the admin.json file with a new booking */
  async updateAdminJSON(bookedShows) {
    let adminJSON = await JSON._load('admin.json');

    /* loop through every booking and see if there already exists a booking for this user/showing */
    for (let i = 0; i < adminJSON.length; i++) {
      if (adminJSON[i].Email === tempStore.currentTester.Email && adminJSON[i].film === bookedShows.film && adminJSON[i].auditorium === bookedShows.auditorium && adminJSON[i].date === bookedShows.date && adminJSON[i].time === bookedShows.time) {
        /* if there is a booking, update that booking with this session's additional booking information */
        for (let j = 0; j < bookedShows.seats.length; j++) {
          adminJSON[i].seats.push(bookedShows.seats[j]);
        }
        adminJSON[i].seats.sort();
        adminJSON[i].price += bookedShows.price;
        await JSON._save('admin.json', adminJSON);
        return;
      }
    }

    /* if there was not a booking for the user/showing, create a new one and add it to admin.json */
    bookedShows.Email = tempStore.currentTester.Email;
    adminJSON.push(bookedShows);

    /* a compare function for sorting the entire adminJSON variable */
    function compare(a, b) {
      if (a.Email.localeCompare(b.Email) < 0) {
        return -1;
      }
      if (a.Email.localeCompare(b.Email) > 0) {
        return 1;
      }
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      if (a.time < b.time) {
        return -1;
      }
      if (a.time > b.time) {
        return -1;
      }
      return 0;
    }

    adminJSON.sort(compare); // sort adminJSON for future readability
    await JSON._save('admin.json', adminJSON);
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

  updateAgeField(event) {
    let checkbox = event.target;
    /* if a box is checked, add an adult ticket */
    if (checkbox.checked == true) {
      this.tempStore.bookingChildAdultRetiree[1]++;
    } else { /* if the box is unchecked, subtract a ticket from adult, child, or retiree as applicable */
      if (this.tempStore.bookingChildAdultRetiree[1] > 0) {
        this.tempStore.bookingChildAdultRetiree[1]--;
      } else if (this.tempStore.bookingChildAdultRetiree[0] > 0) {
        this.tempStore.bookingChildAdultRetiree[0]--;
      } else {
        this.tempStore.bookingChildAdultRetiree[2]--;
      }
    }
    this.tempStore.save();

    /* re-render the ticket-type button totals */
    $('.age-btn-row').html(this.ageButtons());
    $('.button-row').html(this.generateBookingPriceButton());
  }

  updateAgeMinus(event) {
    /* if anything is subtracted from child or retiree, add it to the adult category */
    if (event.target.id === "child-minus" && this.tempStore.bookingChildAdultRetiree[0] > 0) {
      this.tempStore.bookingChildAdultRetiree[0]--;
      this.tempStore.bookingChildAdultRetiree[1]++;
    } else if (event.target.id === "retiree-minus" && this.tempStore.bookingChildAdultRetiree[2] > 0) {
      this.tempStore.bookingChildAdultRetiree[2]--;
      this.tempStore.bookingChildAdultRetiree[1]++;
      /* if something is subtracted from adult, add it to the child category */
    } else if (event.target.id === "adult-minus" && this.tempStore.bookingChildAdultRetiree[1] > 0) {
      this.tempStore.bookingChildAdultRetiree[1]--;
      this.tempStore.bookingChildAdultRetiree[0]++;
    }
    this.tempStore.save();

    /* re-render the ticket-type button totals */
    $('.age-btn-row').html(this.ageButtons());
    $('.button-row').html(this.generateBookingPriceButton());
  }

  updateAgePlus(event) {
    /* if anything is added to child, subtract from adult or retiree */
    if (event.target.id === "child-plus" && this.tempStore.bookingLatestBookedSeats.length > 0) {
      if (this.tempStore.bookingChildAdultRetiree[1] > 0) {
        this.tempStore.bookingChildAdultRetiree[1]--;
        this.tempStore.bookingChildAdultRetiree[0]++;
      } else if (this.tempStore.bookingChildAdultRetiree[2] > 0) {
        this.tempStore.bookingChildAdultRetiree[2]--;
        this.tempStore.bookingChildAdultRetiree[0]++;
      }
      /* if anything is added to retiree, subtract from adult or child */
    } else if (event.target.id === "retiree-plus" && this.tempStore.bookingLatestBookedSeats.length > 0) {
      if (this.tempStore.bookingChildAdultRetiree[1] > 0) {
        this.tempStore.bookingChildAdultRetiree[1]--;
        this.tempStore.bookingChildAdultRetiree[2]++;
      } else if (this.tempStore.bookingChildAdultRetiree[0] > 0) {
        this.tempStore.bookingChildAdultRetiree[0]--;
        this.tempStore.bookingChildAdultRetiree[2]++;
      }
      /* if anything is added to adult, subtract from child or retiree */
    } else if (event.target.id === "adult-plus" && this.tempStore.bookingLatestBookedSeats.length > 0) {
      if (this.tempStore.bookingChildAdultRetiree[0] > 0) {
        this.tempStore.bookingChildAdultRetiree[0]--;
        this.tempStore.bookingChildAdultRetiree[1]++;
      } else if (this.tempStore.bookingChildAdultRetiree[2] > 0) {
        this.tempStore.bookingChildAdultRetiree[2]--;
        this.tempStore.bookingChildAdultRetiree[1]++;
      }
    }
    this.tempStore.save();

    /* re-render the ticket-type button totals */
    $('.age-btn-row').html(this.ageButtons());
    $('.button-row').html(this.generateBookingPriceButton());
  }


  /* used to remove a someone from the age array if needed */
  subtractPerson() {
    if (this.tempStore.bookingChildAdultRetiree[1] > 0) {
      this.tempStore.bookingChildAdultRetiree[1]--;
    } else if (this.tempStore.bookingChildAdultRetiree[0] > 0) {
      this.tempStore.bookingChildAdultRetiree[0]--;
    } else if (this.tempStore.bookingChildAdultRetiree[2] > 0) {
      this.tempStore.bookingChildAdultRetiree[2]--;
    }
    this.tempStore.save();
  }

  /* calculates the current price of tickets and returns how the booking button should display */
  generateBookingPriceButton() {
    let price = 0;
    price += this.tempStore.bookingChildAdultRetiree[0] * 65;
    price += this.tempStore.bookingChildAdultRetiree[1] * 85;
    price += this.tempStore.bookingChildAdultRetiree[2] * 75;

    /* re-render the booking button */
    if (price === 0) {
      return /*html*/`<a class="booking-btn" href="#confirmation">BOKA NU</a>`;
    } else {
      return /*html*/`<a class="booking-btn" href="#confirmation" id="exp-booking-btn">BOKA NU (${price} kr)</a>`;
    }
  }

}