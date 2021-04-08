import tempStore from '../tempStore.js';
import FileFunctions from '../fileFunctions.js';

export default class ProfilePage {

  async read() {
    this.currentUser = await $.getJSON("./json/account.json");
    this.user = tempStore.currentTester;
  }

  constructor() {
    this.eventHandeler();
  }




  async render() {

    if (!this.currentUser) {
      await this.read();
    }
    if (!this.user || this.user !== tempStore.currentTester) {
      await this.read();
    }


    return /*html*/ `
    
    <div class="profile-page-container">
          <div class="profile-wrapper">
              <h1 class="profile-title">${this.user.Name}</h1>
              <div class="profile-picture"></div>
                <div class="profile-text-container">
                <p>Epost-adress: ${this.user.Email} </p>
                <p>Mobilnummer: 070-666 666 </p>
                <p>Namn: ${this.user.Name}</p>
                <p>Efternamn: ${this.user.Lastname}</p>
                <p>Betalsätt: Faktura</p>
                <button class="remove-account">Ta bort konto</button>
                <button class="options-account">inställningar</button>
                </div>
          </div>
         
          
          <div class="bookings-wrapper">
            <h1 class="bookings-title">bokningar</h1><button class="show-tickets">visa mina bokningar</button>
            <div class="bookings-text-container">
              
            </div>
          </div>
          </div>
         
    </div>
     
    `

  }

  eventHandeler() {
    $('main').on('click', '.show-tickets', () => this.ticketLooper());
    $('main').on('click', '.cancel-btn', (event) => this.cancelSelectedTicket(event));
  }



  async ticketLooper() {

    /* if logged in as admin, show all bookings */
    if (tempStore.currentTester.Email === 'admin@filmvisarna.se') {
      let admin = await $.getJSON("./json/admin.json");

      for (let i = 0; i < admin.length; i++) {
        $('.bookings-text-container').append(/*html*/ `     
          <div class="booked-tickets">
          <div class="booked-tickets-info">
          <h3>Film :</h3> <p>${admin[i].film}</p>
          <h3>Datum :</h3><p>${admin[i].date}</p> 
          <h3>Tid :</h3><p> ${admin[i].time}</p> 
          <h3>Salong :</h3><p> ${admin[i].auditorium}</p>
          <h3>Platser :</h3><p> ${admin[i].seats}</p>
          <h3>Användare :</h3><p> ${admin[i].Email}</p>
          </div>
          </div>
        `)
      }
      return;
    }

    for (let i = 0; i < tempStore.currentTester.bookedShows.length; i++) {
      let bookedShow = tempStore.currentTester.bookedShows[i];
      $('.bookings-text-container').append(/*html*/ `     
      <div class="booked-tickets">
      <div class="booked-tickets-info">
      <h3>Film :</h3> <p>${bookedShow.film}</p>
      <h3>Datum :</h3><p>${bookedShow.date}</p> 
      <h3>Tid :</h3><p> ${bookedShow.time}</p> 
      <h3>Salong :</h3><p> ${bookedShow.auditorium}</p> 
      <h3>Platser :</h3><p> ${bookedShow.seats}</p>
      </div>
      <div class="cancel-btn-holder">
      <button class="cancel-btn" value="${i}">Avboka</button>
      </div>    
      </div> 
      `)
    };



  }

  //Start the cancelSelectedTicket, should remove the ticket, and also reverse the booked seats to "unbooked".
  async cancelSelectedTicket(event) {

    //defining accounts to the account.json file
    let accounts = await $.getJSON("./json/account.json");

    //selected this is basically the selected ticket that you chose from your bookingslist
    let selectedTicket = this.user.bookedShows[event.target.value];

    //start the loop and go on as many times as there are accounts
    for (let i = 0; i < accounts.length; i++) {

      //If the email inside of account.json is equal to the email of the logged in user
      if (accounts[i].Email === tempStore.currentTester.Email) {

        //Start this for-loop that goes on for as many tickets(booked shows) that are inside of the logged in account
        for (let j = 0; j < accounts[i].bookedShows.length; j++) {

          //if the title,date,time and auditorium are the same as the selected ticket then..
          if (accounts[i].bookedShows[j].film === selectedTicket.film && accounts[i].bookedShows[j].date === selectedTicket.date && accounts[i].bookedShows[j].time === selectedTicket.time &&
            accounts[i].bookedShows[j].auditorium === selectedTicket.auditorium) {

            /*-- update the booking file --*/
            // get the booking file name and load it
            let bookingFile = FileFunctions.getBookingFile
              (selectedTicket.film, selectedTicket.auditorium, selectedTicket.date, selectedTicket.time);

            let booking = await $.getJSON('./json/booking/' + bookingFile);

            // set every relevant booked ticket for this user to 0 in the booking file
            for (let k = 0; k < accounts[i].bookedShows[j].seats.length; k++) {
              let temp = accounts[i].bookedShows[j].seats[k].split(' '); // split the ticket number so that we can use it as an index in the seating chart (ex. "A 1" == {0, 0})
              booking[0].seating[temp[0].charCodeAt(0) - 65][temp[1] - 1] = 0;
            }
            // save the booking back to the file
            await JSON._save('/booking/' + bookingFile, booking);

            /*-- update admin.json --*/
            let admin = await $.getJSON('./json/admin.json');
            for (let k = 0; k < admin.length; k++) {
              if (admin[k].Email === tempStore.currentTester.Email && admin[k].film === selectedTicket.film && admin[k].auditorium === selectedTicket.auditorium && admin[k].date === selectedTicket.date && admin[k].time === selectedTicket.time) {
                admin.splice(k, 1);
                await JSON._save('admin.json', admin);
                break;
              }
            }

            /*-- update the account JSON file --*/
            accounts[i].bookedShows.splice(j, 1);
            await JSON._save('account.json', accounts);

            /*-- update the session storage --*/
            tempStore.currentTester.bookedShows.splice(j, 1);
            tempStore.save();
            break;
          }
        }
        break;
      }
    }




  }
}
