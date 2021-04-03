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

    $('main').on('click', '.cancel-btn', (event) => this.cancelSelectedTicket(event));
  }


  ticketLooper() {
    

    for (let i = 0; i < this.user.bookedShows.length; i++) {
      let bookedShow = this.user.bookedShows[i];
     
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

  
  cancelSelectedTicket(event) {

    let selectedTicket = this.user.bookedShows[event.target.value];
    console.log(selectedTicket)
    
    for (let i = 0; i < selectedTicket; i++){
      console.log(selectedTicket)
    }
  }

   


// ${this.user.bookedShows[i]}
  

}

