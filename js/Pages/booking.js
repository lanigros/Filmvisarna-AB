import tempStore from '../tempStore.js';
import bookingTempStore from '../bookingTempStore.js';

export default class Booking {

  constructor() {
    this.addEventHandlers();
  }

  addEventHandlers() {
    $('body').on('change', '.seating-container input[type="checkbox"]', (event) => this.updateBookingArray(event)); // Listen to changes on checkboxes
    $('body').on('change', '.seating-container input[type="checkbox"]', (event) => this.updateAgeField(event)); // Listen to changes on checkboxes
    $('body').on('click', '.seating-container .booking-btn', () => this.confirmBookingJSON()); // Listen to the booking button
    $('body').on('click', '.age-btn-minus', (event) => this.updateAgeMinus(event)); // Listen to the minus buttons
    $('body').on('click', '.age-btn-plus', (event) => this.updateAgePlus(event)); // Listen to the plus buttons
  }

  async read() {
    bookingTempStore.showingDetails = (await JSON._load(bookingTempStore.bookingFile))[0];
    bookingTempStore.save();
  }

  async render() {
    /*-- run various set-ups and checks before returning the html string --*/
    // If there was a conflicting booking when trying to confirm, alert the user. Note that this variable is set in the confirmBookingJSON function
    if (this.conflictingBooking) {
      this.conflictingBooking = false;
      setTimeout(function () { alert("En eller flera bokningar gjordes av någon annan"); }, 100); // delay so that the booking page reloads instead of stopping on the confirmation page
    }
    // if we're there's no booking file specified, go back to home page (ex. someone accessing the booking page NOT from the booking calendar)
    if (!bookingTempStore.bookingFile) {
      document.location.href = "#";
      return;
    }
    // if this is a new/different booking file, reset session variables
    if (bookingTempStore.bookingFileHasChanged) {
      await this.resetBookingSessionVariables();
    }
    // if the user is not logged in, go to login page
    if (!tempStore.currentTester) {
      tempStore.bookingLoginRedirect = true; // set session storage to redirect back to the booking page after logging in
      tempStore.save();
      document.location.href = "#logIn";
      return;
    }

    await this.read(bookingTempStore.bookingFile);

    /*-- return the actual text that we can use to render the page --*/
    return this.returnRenderText();
  }

  /* resets the booking session variables if we want to begin with a new booking */
  async resetBookingSessionVariables() {
    bookingTempStore.latestBookedSeats = []; // contains tickets that are being or were recently booked
    bookingTempStore.childAdultRetiree = [0, 0, 0]; // contains the number of child (index 0), adult (index 1), and retiree (index 2) tickets being booked
    bookingTempStore.unconfirmedSeatingSelection = (await JSON._load(bookingTempStore.bookingFile))[0].seating; // contains the seating chart not yet saved to the JSON (including the user's selections)
    bookingTempStore.bookingFileHasChanged = false;
    bookingTempStore.save();
  }

  /* returns the whole render html for the page */
  returnRenderText() {
    /*-- add heading part of seating chart --*/
    let layout = /*html*/`
      <div class="seating-container">
        <div class="buffer"></div>
        <div class="movie-details-row">
          <em>${bookingTempStore.showingDetails.film}: ${bookingTempStore.showingDetails.date} (${bookingTempStore.showingDetails.time})</em>
        </div>
        <div class="screen-row">
          <div></div>
          <h1>SKÄRM</h1>
          <div></div>
        </div>
        <div class="seating-rows-container">
    `
    /*-- add seating/checkboxes part of seating chart --*/
    layout += this.seatingChart();
    /*-- closing tags and footer part of seating chart --*/
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
          ${this.bookingPriceButton()}
        </div>
        <div class="buffer"></div>
      </div>
    `

    return layout;
  }

  /* returns the seating chart section of the render text */
  seatingChart() {
    let layout = "";
    for (let i = 0; i < bookingTempStore.unconfirmedSeatingSelection.length; i++) {
      layout += /*html*/`
        <div class="row">
      `
      for (let j = 0; j < bookingTempStore.unconfirmedSeatingSelection[i].length; j++) {
        /* convert i and j into the ticket number for a seat */
        let id = String.fromCharCode(65 + i) + " " + (j + 1);
        /*-- populate seat if unavailable --*/
        /* note that we can look at either the showingDetails or unconfirmedSeatingSelection variables for this, but we choose to look at showingDetails since this is the source of truth for confirmed bookings */
        if (bookingTempStore.showingDetails.seating[i][j] === 2) {
          // if there is a discrepancy between the session storage and the JSON, correct the session storage
          if (bookingTempStore.unconfirmedSeatingSelection[i][j] !== 2) {
            this.remove(bookingTempStore.latestBookedSeats, id); // remove the ticket id that is no longer available
            bookingTempStore.unconfirmedSeatingSelection[i][j] = 2; // mark the seat as unavailable
            bookingTempStore.save();
            this.subtractPerson(); // remove a person from the age-selection buttons
          }
          layout += /*html*/`
            <input type="checkbox" id='${id}' disabled>
            <label for='${id}'></label>
          `
        } else if (bookingTempStore.unconfirmedSeatingSelection[i][j] === 1) {
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

    return layout;
  }

  /* returns the age button part of the render text */
  ageButtons() {
    return /*html*/`
      <div class="single-age-container">
        <div class="age-btn-wrapper">
          <span class="age-btn-minus" id="child-minus">-</span>
          <div class="age-btn-value">${bookingTempStore.childAdultRetiree[0]}</div>
          <span class="age-btn-plus" id="child-plus">+</span>
        </div>
        <p>Barn (0-15)</p>
      </div>
      <div class="single-age-container">
        <div class="age-btn-wrapper">
          <span class="age-btn-minus" id="adult-minus">-</span>
          <div class="age-btn-value">${bookingTempStore.childAdultRetiree[1]}</div>
          <span class="age-btn-plus" id="adult-plus">+</span>
        </div>
        <p>Normal</p>
      </div>
      <div class="single-age-container">
        <div class="age-btn-wrapper">
          <span class="age-btn-minus" id="retiree-minus">-</span>
          <div class="age-btn-value">${bookingTempStore.childAdultRetiree[2]}</div>
          <span class="age-btn-plus" id="retiree-plus">+</span>
        </div>
        <p>Pensionär</p>
      </div>
    `
  }

  /* if checking or unchecking a seat, update all session storage and display appropriately */
  async updateBookingArray(event) {
    let checkbox = event.target;
    let seatID = checkbox.id;
    let index = seatID;
    //convert the ticket number (value) into the index numbers used in the seating chart array
    index = index.split(" ");
    index[0] = index[0].charCodeAt(0) - 65;
    index[1]--;

    //update the status of the checkbox (seat) in the seating chart array
    if (checkbox.disabled == true) {
      bookingTempStore.unconfirmedSeatingSelection[index[0]][index[1]] = 2;
      this.remove(bookingTempStore.latestBookedSeats, seatID);
    } else if (checkbox.checked == true) {
      bookingTempStore.unconfirmedSeatingSelection[index[0]][index[1]] = 1;
      bookingTempStore.latestBookedSeats.push(seatID);
    } else {
      bookingTempStore.unconfirmedSeatingSelection[index[0]][index[1]] = 0;
      this.remove(bookingTempStore.latestBookedSeats, seatID);
    }
    bookingTempStore.save();
  }

  /* Complete all session storage and JSON actions after clicking the "confirm booking" button */
  async confirmBookingJSON() {
    // determine if there was a booking conflict
    await this.conflictingBookingExists();
    if (this.conflictingBooking) {
      document.location.href = "#booking";
      return;
    }

    // if no bookings were made, simply reload page
    if (bookingTempStore.latestBookedSeats.length < 1) {
      document.location.href = "#booking";
      return;
    }

    // now, since there are no conflits, turn any unconfirmed bookings into confirmed bookings in session storage and save to the appropriate booking JSON
    this.confirmBookingsInArrays();
    await JSON._save(bookingTempStore.bookingFile, [bookingTempStore.showingDetails]);

    // create an object with the booking information
    let bookedShow = ({
      auditorium: bookingTempStore.showingDetails.auditorium,
      film: bookingTempStore.showingDetails.film,
      date: bookingTempStore.showingDetails.date,
      time: bookingTempStore.showingDetails.time,
      seats: bookingTempStore.latestBookedSeats,
      price: (bookingTempStore.childAdultRetiree[0] * 65) + (bookingTempStore.childAdultRetiree[1] * 85) + (bookingTempStore.childAdultRetiree[2] * 75)
    });
    bookedShow.seats.sort(); // sort the seating tickets for easier readability

    /* Update account.json file with this booking */
    await this.updateAccountsJSON(bookedShow);

    /* Update admin.json file with this booking */
    await this.updateAdminJSON(bookedShow);

    // reset session variables
    bookingTempStore.latestBookedSeats = [];
    bookingTempStore.childAdultRetiree = [0, 0, 0];
    bookingTempStore.save();
  }

  /* determines if there's a conflicting booking and sets this.conflictingBooking to 'true' if so */
  async conflictingBookingExists() {
    await this.read(); // make sure that our data is up-to-date with the JSON

    this.conflictingBooking = false;

    /* first, loop through array and determine if there are any booking conflicts */
    for (let i = 0; i < bookingTempStore.unconfirmedSeatingSelection.length; i++) {
      for (let j = 0; j < bookingTempStore.unconfirmedSeatingSelection[i].length; j++) {
        let id = String.fromCharCode(65 + i) + " " + (j + 1);
        if (bookingTempStore.unconfirmedSeatingSelection[i][j] === 1) {
          if (bookingTempStore.showingDetails.seating[i][j] === 2) {
            this.remove(bookingTempStore.latestBookedSeats, id); // remove the conflicting ticket from our ticket array
            this.conflictingBooking = true;
          }
        }
      }
    }
    bookingTempStore.save();
  }

  /* change all unconfirmed bookings in the unconfirmed booking and booking information arrays to confirmed */
  confirmBookingsInArrays() {
    for (let i = 0; i < bookingTempStore.unconfirmedSeatingSelection.length; i++) {
      for (let j = 0; j < bookingTempStore.unconfirmedSeatingSelection[i].length; j++) {
        if (bookingTempStore.unconfirmedSeatingSelection[i][j] === 1) {
          bookingTempStore.unconfirmedSeatingSelection[i][j] = 2;
          bookingTempStore.showingDetails.seating[i][j] = 2;
        }
      }
    }
    bookingTempStore.save();
  }

  /* search the account.json file for the appropriate user and add booking details to their bookedShows variable, then save the updated info to the account.json file */
  async updateAccountsJSON(bookedShow) {
    let accounts = await JSON._load('account.json');

    for (let i = 0; i < accounts.length; i++) {
      /* find active user in account.json */
      if (accounts[i].Email === tempStore.currentTester.Email) {
        /* if there are already bookings for this showing, append most recent booking */
        let identical = false;
        for (let j = 0; j < accounts[i].bookedShows.length; j++) {
          if (accounts[i].bookedShows[j].auditorium === bookedShow.auditorium && accounts[i].bookedShows[j].film === bookedShow.film && accounts[i].bookedShows[j].date === bookedShow.date && accounts[i].bookedShows[j].time === bookedShow.time) {
            for (let k = 0; k < bookedShow.seats.length; k++) {
              accounts[i].bookedShows[j].seats.push(bookedShow.seats[k]);
            }
            accounts[i].bookedShows[j].seats.sort();
            accounts[i].bookedShows[j].price += bookedShow.price; // update the price rather than overwrite or ignore it
            identical = true;
          }
        }
        /* if there are no other bookings for this showing, simply add the booking information to the account */
        if (!identical) {
          accounts[i].bookedShows.push(bookedShow);
        }

        tempStore.currentTester = accounts[i]; // save booking to logged-in user session storage
        tempStore.save();

        await JSON._save('account.json', accounts);
        return;
      }
    }

    return;
  }

  /* A function to load and update the admin.json file with a new booking */
  async updateAdminJSON(bookedShow) {
    let adminJSON = await JSON._load('admin.json');

    /* loop through every booking and see if there already exists a booking for this user/showing */
    for (let i = 0; i < adminJSON.length; i++) {
      if (adminJSON[i].Email === tempStore.currentTester.Email && adminJSON[i].film === bookedShow.film && adminJSON[i].auditorium === bookedShow.auditorium && adminJSON[i].date === bookedShow.date && adminJSON[i].time === bookedShow.time) {
        /* if there is a booking, update that booking with this session's additional booking information */
        for (let j = 0; j < bookedShow.seats.length; j++) {
          adminJSON[i].seats.push(bookedShow.seats[j]);
        }
        adminJSON[i].seats.sort();
        adminJSON[i].price += bookedShow.price;
        await JSON._save('admin.json', adminJSON);
        return;
      }
    }

    /* if there was not a booking for the user/showing, create a new one and add it to admin.json */
    bookedShow.Email = tempStore.currentTester.Email;
    adminJSON.push(bookedShow);

    adminJSON.sort(this.compareBookingObjects); // sort adminJSON for future readability
    await JSON._save('admin.json', adminJSON);
  }

  /* a compare function for sorting booking objects for the admin.json file */
  compareBookingObjects(a, b) {
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

  updateAgeField(event) {
    let checkbox = event.target;
    /* if a box is checked, add an adult ticket */
    if (checkbox.checked == true) {
      bookingTempStore.childAdultRetiree[1]++;
    } else { /* if the box is unchecked, subtract a ticket from adult, child, or retiree as applicable */
      if (bookingTempStore.childAdultRetiree[1] > 0) {
        bookingTempStore.childAdultRetiree[1]--;
      } else if (bookingTempStore.childAdultRetiree[0] > 0) {
        bookingTempStore.childAdultRetiree[0]--;
      } else {
        bookingTempStore.childAdultRetiree[2]--;
      }
    }
    bookingTempStore.save();

    /* re-render the ticket-type button totals */
    $('.age-btn-row').html(this.ageButtons());
    $('.button-row').html(this.bookingPriceButton());
  }

  updateAgeMinus(event) {
    /* if anything is subtracted from child or retiree, add it to the adult category */
    if (event.target.id === "child-minus" && bookingTempStore.childAdultRetiree[0] > 0) {
      bookingTempStore.childAdultRetiree[0]--;
      bookingTempStore.childAdultRetiree[1]++;
    } else if (event.target.id === "retiree-minus" && bookingTempStore.childAdultRetiree[2] > 0) {
      bookingTempStore.childAdultRetiree[2]--;
      bookingTempStore.childAdultRetiree[1]++;
      /* if something is subtracted from adult, add it to the child category */
    } else if (event.target.id === "adult-minus" && bookingTempStore.childAdultRetiree[1] > 0) {
      bookingTempStore.childAdultRetiree[1]--;
      bookingTempStore.childAdultRetiree[0]++;
    }
    bookingTempStore.save();

    /* re-render the ticket-type button totals */
    $('.age-btn-row').html(this.ageButtons());
    $('.button-row').html(this.bookingPriceButton());
  }

  updateAgePlus(event) {
    /* if anything is added to child, subtract from adult or retiree */
    if (event.target.id === "child-plus" && bookingTempStore.latestBookedSeats.length > 0) {
      if (bookingTempStore.childAdultRetiree[1] > 0) {
        bookingTempStore.childAdultRetiree[1]--;
        bookingTempStore.childAdultRetiree[0]++;
      } else if (bookingTempStore.childAdultRetiree[2] > 0) {
        bookingTempStore.childAdultRetiree[2]--;
        bookingTempStore.childAdultRetiree[0]++;
      }
      /* if anything is added to retiree, subtract from adult or child */
    } else if (event.target.id === "retiree-plus" && bookingTempStore.latestBookedSeats.length > 0) {
      if (bookingTempStore.childAdultRetiree[1] > 0) {
        bookingTempStore.childAdultRetiree[1]--;
        bookingTempStore.childAdultRetiree[2]++;
      } else if (bookingTempStore.childAdultRetiree[0] > 0) {
        bookingTempStore.childAdultRetiree[0]--;
        bookingTempStore.childAdultRetiree[2]++;
      }
      /* if anything is added to adult, subtract from child or retiree */
    } else if (event.target.id === "adult-plus" && bookingTempStore.latestBookedSeats.length > 0) {
      if (bookingTempStore.childAdultRetiree[0] > 0) {
        bookingTempStore.childAdultRetiree[0]--;
        bookingTempStore.childAdultRetiree[1]++;
      } else if (bookingTempStore.childAdultRetiree[2] > 0) {
        bookingTempStore.childAdultRetiree[2]--;
        bookingTempStore.childAdultRetiree[1]++;
      }
    }
    bookingTempStore.save();

    /* re-render the ticket-type button totals */
    $('.age-btn-row').html(this.ageButtons());
    $('.button-row').html(this.bookingPriceButton());
  }


  /* used to remove someone from the age array if needed */
  subtractPerson() {
    if (bookingTempStore.childAdultRetiree[1] > 0) {
      bookingTempStore.childAdultRetiree[1]--;
    } else if (bookingTempStore.childAdultRetiree[0] > 0) {
      bookingTempStore.childAdultRetiree[0]--;
    } else if (bookingTempStore.childAdultRetiree[2] > 0) {
      bookingTempStore.childAdultRetiree[2]--;
    }
    bookingTempStore.save();
  }

  /* calculates the current price of tickets and returns how the booking button should display */
  bookingPriceButton() {
    let price = 0;
    price += bookingTempStore.childAdultRetiree[0] * 65;
    price += bookingTempStore.childAdultRetiree[1] * 85;
    price += bookingTempStore.childAdultRetiree[2] * 75;

    /* re-render the booking button */
    if (price === 0) {
      return /*html*/`<a class="booking-btn" href="#confirmation">BOKA NU</a>`;
    } else {
      return /*html*/`<a class="booking-btn" href="#confirmation" id="exp-booking-btn">BOKA NU (${price} kr)</a>`;
    }
  }

  /* utility function for removing a value from an array */
  remove(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        array.splice(i, 1);
      }
    }
  }

}