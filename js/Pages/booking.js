import tempStore from '../tempStore.js'; // session storage variable for logged-in user
import bookingTempStore from '../bookingTempStore.js'; // session storage variable for booking information
import BookingUtilityFunctions from '../bookingUtilityFunctions.js'; // utility functions used for booking calculations and actions

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
      await BookingUtilityFunctions.resetBookingSessionVariables();
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
          ${BookingUtilityFunctions.bookingPriceButton()}
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
            BookingUtilityFunctions.remove(bookingTempStore.latestBookedSeats, id); // remove the ticket id that is no longer available
            bookingTempStore.unconfirmedSeatingSelection[i][j] = 2; // mark the seat as unavailable
            bookingTempStore.save();
            BookingUtilityFunctions.subtractPerson(); // remove a person from the age-selection buttons
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
      BookingUtilityFunctions.remove(bookingTempStore.latestBookedSeats, seatID);
    } else if (checkbox.checked == true) {
      bookingTempStore.unconfirmedSeatingSelection[index[0]][index[1]] = 1;
      bookingTempStore.latestBookedSeats.push(seatID);
    } else {
      bookingTempStore.unconfirmedSeatingSelection[index[0]][index[1]] = 0;
      BookingUtilityFunctions.remove(bookingTempStore.latestBookedSeats, seatID);
    }
    bookingTempStore.save();
  }

  /* Complete all session storage and JSON actions after clicking the "confirm booking" button */
  async confirmBookingJSON() {
    // determine if there was a booking conflict
    this.conflictingBooking = await BookingUtilityFunctions.conflictingBookingExists();
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
    BookingUtilityFunctions.confirmBookingsInArrays();
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

    await BookingUtilityFunctions.updateAccountsJSON(bookedShow); // Update account.json file with this booking

    await BookingUtilityFunctions.updateAdminJSON(bookedShow); // Update admin.json file with this booking

    // reset session variables
    bookingTempStore.latestBookedSeats = [];
    bookingTempStore.childAdultRetiree = [0, 0, 0];
    bookingTempStore.save();
  }

  /* updates the age boxes when someone clicks on a seat checkbox */
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
    $('.button-row').html(BookingUtilityFunctions.bookingPriceButton());
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
    $('.button-row').html(BookingUtilityFunctions.bookingPriceButton());
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
    $('.button-row').html(BookingUtilityFunctions.bookingPriceButton());
  }

}