

export default class ProfilePage {

  constructor() {
    this.eventHandeler();
  }



  async read() {
    this.currentUser = await $.getJSON("./json/account.json");
    this.user = window.activeUser;
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
          <h1 class="profile-title">profil</h1>
          <div class="profile-text-container">
          <p>Epost-adress: ${window.activeUser.Email} </p>
          <p>Namn: ${window.activeUser.Name}</p>
          <p>Efternamn: ${window.activeUser.Lastname}</p>
          </div>
          </div>
          <div class="profile-divider"></div>
          <div class="bookings-wrapper">
            <h1 class="bookings-title">bokningar</h1>
            <div class="bookings-text-container"> Hej!
            </div>
              
              <p>(Avboka knapp)</p>
          </div>
          </div>
    </div>
    `
  }


  eventHandeler() {
    $('main').on("click", ".bookings-text-container", () => this.ticketLooper())
  }

  ticketLooper() {
    console.log('Ticketlooper start')
    for (let i = 0; i < activeUser.bookedShows.length; i++) {
      $('.bookings-text-container').append(/*html*/ `
      <div class="booked-tickets">
      <p>Film : ${activeUser.bookedShows[i].film}</p> 
      <p>Datum : ${activeUser.bookedShows[i].date}</p> 
      <p>Tid : ${activeUser.bookedShows[i].time}</p> 
      <p>Salong : ${activeUser.bookedShows[i].auditorium}</p> 
      <p>Platser : ${activeUser.bookedShows[i].seats}</p> 
      </div>
      `)
    };
    
    //    console.log('hello')
    // const tickets = this.user.bookedShows[0];
    
    // for (const property in tickets) {
    //   console.log(`${property}: ${Object[property]}`);
    // }
    
    //let bookedShowsLength = activeUser.bookedShows.length;

    


  }
}