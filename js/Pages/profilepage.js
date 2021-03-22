import logIn from ("./pages/logIn.js");

export default class ProfilePage{

  async read() {
    this.currentUser = await $.getJSON("./json/account.json")
  }



  async render() {

    if (!this.currentUser) {
      await this.read();
    }
    

    console.log(activeUser);

    return /*html*/ `
    
    <div class="profile-page-container">
        <div class="profile-wrapper">
        <h1 class="profile-title">profil</h1>
        <div class="profile-text-container">
        <p>Epost-adress: ${activeUser.Email}</p>
        <p>Namn: ${this.currentUser.Name}</p>
        <p>Efternamn: ${this.currentUser.Lastname}</p>
        </div>
        </div>
        <div class="profile-divider"></div>
        <div class="bookings-wrapper">
        <h1 class="bookings-title">Mina bokningar</h1>
        <div class="bookings-text-container">
        <p>Datum: </p>
        </div>
        </div>
    </div>
    
    
    `

  }


}