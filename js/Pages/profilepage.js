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
                <p>Namn: ${this.user.Name}</p>
                <p>Efternamn: ${this.user.Lastname}</p>
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
     
   console.log(this.user)
   
     for (let i = 0; i < this.currentUser.bookedShows.length; i++) {
      $('.bookings-text-container').append(/*html*/ `
      <div class="booked-tickets">
      <p>Film : ${this.user.bookedShows[i].film}</p> 
      <p>Datum : ${this.user.bookedShows[i].date}</p> 
      <p>Tid : ${this.user.bookedShows[i].time}</p> 
      <p>Salong : ${this.user.bookedShows[i].auditorium}</p> 
      <p>Platser : ${this.user.bookedShows[i].seats}</p> 
      </div>
      `)
    };
  }
}