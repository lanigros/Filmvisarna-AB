

export default class ProfilePage {


  constructor() {
    this.eventHandeler();
  }


 setLocalStorage() {
    this.tempStore = {};
    try {
      this.tempStore = JSON.parse(sessionStorage.store);
    } catch (e) { }
    this.tempStore.save = function () {
      sessionStorage.store = JSON.stringify(this);
    }
  }

  async read() {
    this.currentUser = await $.getJSON("./json/account.json");
   
  }





  async render() {

    console.log(this.tempStore.currentTester);
    

    if (!this.currentUser) {
      await this.read();
    }
    if (!this.user) {
      await this.read();
    }

    

    return /*html*/ `
    
    <div class="profile-page-container">
          <div class="profile-wrapper">
          <h1 class="profile-title">profil</h1>
          <div class="profile-text-container">
          <p>Epost-adress: ${this.currentTester.Email} </p>
          <p>Namn: ${this.currentUser.Name}</p>
          <p>Efternamn: ${this.currentUser.Lastname}</p>
          </div>
          </div>
          <div class="profile-divider"></div>
          <div class="bookings-wrapper">
            <h1 class="bookings-title">bokningar</h1>
            <div class="bookings-text-container">
            <button class="show-bookings-btn">Visa min bokningar</button>
            </div>
              
              
          </div>
          </div>
    </div>
    `
  
  }


  eventHandeler() {
    $('main').on('click', ".show-bookings-btn", () => this.ticketLooper());
  }

  ticketLooper() {
     
   
   
     for (let i = 0; i < this.currentUser.bookedShows.length; i++) {
      $('.bookings-text-container').append(/*html*/ `
      <div class="booked-tickets">
      <p>Film : ${this.currentUser.bookedShows[i].film}</p> 
      <p>Datum : ${this.currentUser.bookedShows[i].date}</p> 
      <p>Tid : ${this.currentUser.bookedShows[i].time}</p> 
      <p>Salong : ${this.currentUser.bookedShows[i].auditorium}</p> 
      <p>Platser : ${this.currentUser.bookedShows[i].seats}</p> 
      </div>
      `)
    };
  }
}