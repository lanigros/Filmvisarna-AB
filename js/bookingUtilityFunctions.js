import tempStore from './tempStore.js'; // session storage variable for logged-in user
import bookingTempStore from './bookingTempStore.js'; // session storage variable for booking information

/* A class of static functions used when completing booking actions */

export default class BookingUtilityFunctions {

  static async read() {
    bookingTempStore.showingDetails = (await JSON._load(bookingTempStore.bookingFile))[0];
    bookingTempStore.save();
  }

  /* resets the booking session variables if we want to begin with a new booking */
  static async resetBookingSessionVariables() {
    bookingTempStore.latestBookedSeats = []; // contains tickets that are being or were recently booked
    bookingTempStore.childAdultRetiree = [0, 0, 0]; // contains the number of child (index 0), adult (index 1), and retiree (index 2) tickets being booked
    bookingTempStore.unconfirmedSeatingSelection = (await JSON._load(bookingTempStore.bookingFile))[0].seating; // contains the seating chart not yet saved to the JSON (including the user's selections)
    bookingTempStore.bookingFileHasChanged = false;
    bookingTempStore.save();
  }

  /* determines if there's a conflicting booking, corrects the session storage variables and returns 'true' if so */
  static async conflictingBookingExists() {
    await this.read(); // make sure that our data is up-to-date with the JSON

    let conflictingBooking = false;

    /* first, loop through array and determine if there are any booking conflicts */
    for (let i = 0; i < bookingTempStore.unconfirmedSeatingSelection.length; i++) {
      for (let j = 0; j < bookingTempStore.unconfirmedSeatingSelection[i].length; j++) {
        let id = String.fromCharCode(65 + i) + " " + (j + 1);
        if (bookingTempStore.unconfirmedSeatingSelection[i][j] === 1) {
          if (bookingTempStore.showingDetails.seating[i][j] === 2) {
            this.remove(bookingTempStore.latestBookedSeats, id); // remove the conflicting ticket from our ticket array
            conflictingBooking = true;
          }
        }
      }
    }
    bookingTempStore.save();
    return conflictingBooking;
  }

  /* change all unconfirmed bookings in the unconfirmed booking and booking information arrays to confirmed */
  static confirmBookingsInArrays() {
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
  static async updateAccountsJSON(bookedShow) {
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
  static async updateAdminJSON(bookedShow) {
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

  /* A compare function for sorting booking objects for the admin.json file. Sort by booking date/time/movie and then by user email */
  static compareBookingObjects(a, b) {
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
    if (a.Email.localeCompare(b.Email) < 0) {
      return -1;
    }
    if (a.Email.localeCompare(b.Email) > 0) {
      return 1;
    }
    return 0;
  }

  /* calculates the current price of tickets and returns how the booking button should display */
  static bookingPriceButton() {
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

  /* used to remove someone from the age array if needed */
  static subtractPerson() {
    if (bookingTempStore.childAdultRetiree[1] > 0) {
      bookingTempStore.childAdultRetiree[1]--;
    } else if (bookingTempStore.childAdultRetiree[0] > 0) {
      bookingTempStore.childAdultRetiree[0]--;
    } else if (bookingTempStore.childAdultRetiree[2] > 0) {
      bookingTempStore.childAdultRetiree[2]--;
    }
    bookingTempStore.save();
  }

  /* utility function for removing a value from an array */
  static remove(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        array.splice(i, 1);
      }
    }
  }

}