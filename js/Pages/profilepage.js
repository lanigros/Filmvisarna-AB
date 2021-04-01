import tempStore from '../tempStore.js';

export default class ProfilePage {


  constructor() {
    this.eventHandeler();
  }


  async read() {
    this.currentUser = await $.getJSON("./json/account.json");
    this.user = tempStore.currentTester;
  }


  async render() {

    if (!this.currentUser) {
      await this.read();
    }
    if (!this.user) {
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
            <h1 class="bookings-title">bokningar</h1>
            <div class="bookings-text-container">
            
            </div>
              
              
          </div>
          </div>
    </div>
    `
  
  }


  eventHandeler() {
   
    window.onload = () => this.ticketLooper();
  }

  ticketLooper() {
     for (let i = 0; i < this.user.bookedShows.length; i++) {
      $('.bookings-text-container').append(/*html*/ `
      <div class="booked-tickets">
      
      <div class="booked-tickets-info">
      <h3>Film :</h3> <p>${this.user.bookedShows[i].film}</p>
      <h3>Datum :</h3><p>${this.user.bookedShows[i].date}</p> 
      <h3>Tid :</h3><p> ${this.user.bookedShows[i].time}</p> 
      <h3>Salong :</h3><p> ${this.user.bookedShows[i].auditorium}</p> 
      <h3>Platser :</h3><p> ${this.user.bookedShows[i].seats}</p>
      </div>
      
      <button class="cancel-btn">avboka</button> 
      </div>
      `)
    };
  }
}