//import the Tempstore session storage to the page
import tempStore from '../tempStore.js';

let loggedIn = false;

export default class LogIn {


  //Created a constructor that handels different kinds of events.
  constructor(changeListener) {
    this.changeListener = changeListener;
    this.regHandeler();
    this.logHandeler();
    this.changeHandler();
    this.logOutHandeler();
    this.loggedInCheck();
  }

  async read() {
    this.account = await $.getJSON("./json/account.json");
  }

  //When pressing btn on register run this function
  regHandeler() {
    $('main').on('submit', '#reg-form', (event) => this.createNewUser(event));
  }

  //When pressing btn on login run this function
  logHandeler() {
    $('main').on('submit', '#log-form', (event) => this.logInUser(event));
  }

  //When pressing btn on register run this function
  logOutHandeler() {
    $('header').on('click', '#logOut', () => this.logOut());
  }
  //When a change is made inside of the account ( such as tickets ), run this
  changeHandler() {
    this.changeListener.on('account.json', () => this.updateAccount());
  }
  //When browser refreshes, this function
  loggedInCheck() {
    window.onload = () => this.loggedInOrNot();
  }


  async render() {


    if (!this.account) {
      await this.read()
    }


    return `
    
    <div class="Login-Container">
      
      <div class="Login-wrapper">
          <div class="Title-Container"><h1>login</h1></div>
        
          <div class="Input-Container">
              <form id="log-form">
                <input type="Email" placeholder="Email adress" id="log-email" name="email" required>
                <br>
                <input type="password" placeholder="Lösenord" id="log-pswrd" name="pswrd" required>
                <br>
                <input type="submit" value="Logga in" id="log-btn">
              </form>
          </div>
      </div>
    

      <div class="box-divider"></div>

  
      <div class="Register-wrapper">
        <div class="Title-Container"><h1>Nytt konto</h1></div>
      
              <div class="Input-Container">
                <form id="reg-form">
                  <input type="Email" placeholder="Email adress" id="crt-email" name="email" required>
                  <br>
                  <input type="password" placeholder="Lösenord (8-16 tecken)" id="crt-pswrd" name="pswrd" required>
                  <br>
                  <input type="Text" placeholder="Förnamn" id="fname" name="fname" required>
                  <br>
                  <input type="Text" placeholder="Efternamn" id="lname" name="lname" required>
                  <br>
                  <input type="submit" value="Skapa" id="crt-btn">
                </form>
              </div>
          </div>
        </div>
      </div>
   </div> 
    `

  }

  // create a new user
  async createNewUser(event) {
    event.preventDefault();
    let newEmail = $("#crt-email").val();
    let newPswrd = $("#crt-pswrd").val();
    let newName = $("#fname").val();
    let newLastName = $("#lname").val();
    let bookedShows = [];

    let newUserInfo = ({ Email: newEmail, Password: newPswrd, Name: newName, Lastname: newLastName, bookedShows });
    this.account.push(newUserInfo);
    await JSON._save('account.json', this.account);
    console.log('New account was successfully created!')
    alert('Ditt konto har skapats!')
  }

  //Log in a user and save to the sessionstorage called logInStore

  logInUser(event) {
    event.preventDefault();

    let logEmail = $("#log-email").val();
    let logPswrd = $("#log-pswrd").val();

    this.account.forEach(user => {
      if (logEmail === user.Email && logPswrd === user.Password) {
        alert('Inloggning lyckades!');
        this.activeUser = user;
        loggedIn = true;

        tempStore.currentTester = this.activeUser;
        tempStore.save();

        this.activeMember(this.activeUser);
        // return false;

        // if we were directed here from a booking page, return to booking page after logging in
        if (tempStore.bookingLoginRedirect === true) {
          document.location.href = '#booking';
          return;
        }
      }
    });
  }

  //When a user is logged in, render out a new kind of information on the navbar

  activeMember() {

    if (!loggedIn) { return }

    else {
      console.log('logged on TRUE');
      $('.nav-right-items').replaceWith( /*html*/ `
        <div class="active-User-Container">
        <div class="menu-divider"></div>
        <p>Välkommen ${tempStore.currentTester.Name}!</p>
        <div class="menu-divider"></div>
        <a class="active-user-profile" href="#profilepage">Mina sidor</a>
        <div class="menu-divider"></div>
        <button id="logOut">Logga ut</button>
        </div>
    `);
    }
  }

  //When you log out, clear out the sessionstorage and return the navbar to normal.
  logOut() {
    loggedIn = false;

    delete sessionStorage.logInStore;

    $('.active-User-Container').replaceWith( /*html*/ `
      <div class="nav-right-items">
        <div>
            <a class="nav-login-container" href="#logIn" onclick="document.getElementById('mySidenav').style.width = '0';">LOGGA IN</a>
        </div>
        <div>
          <a class="nav-create-container" href="#logIn" onclick="document.getElementById('mySidenav').style.width = '0';">NYTT KONTO</a>
        </div>
      </div>     
    `);

    // if you log out while on a booking page, return to the login page
    if (document.location.href.includes('#booking')) {
      document.location.href = '#logIn';
      return;
    }
  }

  //If the page refreshes, and the sessionstorage still is active, renderout the active account.
  loggedInOrNot() {

    if (sessionStorage) {

      $('.nav-right-items').replaceWith( /*html*/ `
        <div class="active-User-Container">
        <div class="menu-divider"></div>
        <p>Välkommen ${tempStore.currentTester.Name}!</p>
        <div class="menu-divider"></div>
        <a class="active-user-profile" href="#profilepage">Mina sidor</a>
        <div class="menu-divider"></div>
        <button id="logOut">Logga ut</button>
        </div>
    `);

    }

    else {
      return;
    }

  }

  async updateAccount() {
    if (!tempStore.activeUser) {
      return;
    }

    await this.read();

    this.account.forEach(user => {
      if (tempStore.activeUser.Email === user.Email) {
        window.activeUser = user;
      }
    })
  }
}
