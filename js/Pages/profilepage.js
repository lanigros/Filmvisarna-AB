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
        <div class="profile-wrapper"><h1>Hello</h1></div>
        <div class="profile-divider"></div>
        <div class="bookings-wrapper"></div>
    </div>
    
    
    `

  }


}