
export default class ProfilePage {

  constructor() {
    this.eventHandeler();
  }



  async read() {
    this.currentUser = await $.getJSON("./json/account.json");
    this.user = await window.activeUser;
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
            <div class="bookings-text-container">
            <p>Film : ${this.user.bookedShows.auditorium}</p>
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
    console.log(this.user);
    console.log(activeUser.bookedShows.length);
    console.log(JSON.stringify(this.user.bookedShows[2]));

    let ticketInfoMaster = JSON.stringify(this.user.bookedShows);
    
    for (let i = 0; i < activeUser["bookedShows"].length; i++) {

      $('.bookings-text-container').append( /*html*/ `<div class=tickets><p>${ticketInfoMaster}</p></div>`);
    };
  }
}