
export default class ProfilePage{



  async read() {
    this.currentUser = await $.getJSON("./json/account.json")
  }


  

  async render() {

    if (!this.currentUser) {
      await this.read();
    }
    

    console.log();

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
        <p>Film : </p>
        <p>Salong : </p>
        <p>Tid : </p>
        <p>Plats : </p>
        <p>(Avboka knapp)</p>
        </div>
        </div>
    </div>
    
    
    `

  }


}