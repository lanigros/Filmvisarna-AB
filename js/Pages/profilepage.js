
export default class ProfilePage{

  async read() {
    this.currentUser = await $.getJSON("./json/account.json")
  }



  async render() {

    if (!this.currentUser) {
      await this.read();
    }
    
    return /*html*/ `
    
    <div class="profile-page-container">
        <div class="profile-wrapper">
        <h1 class="profile-title">profil</h1>
        <div class="profile-text-container">
        <p>Epost-adress: ${this.currentUser.Email}</p>
        <p>Namn: ${this.currentUser.Name}</p>
        <p>Efternamn: ${this.currentUser.Lastname}</p>
        <p>Epost-adress: ${this.currentUser.Email}</p>
        <p>Epost-adress: ${this.currentUser.Email}</p>
        </div>
        </div>
        <div class="profile-divider"></div>
        <div class="bookings-wrapper"></div>
    </div>
    
    
    `

  }


}