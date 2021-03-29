
export default class LogIn {

  constructor(changeListener) {
    this.changeListener = changeListener;
    this.logOutHandeler();
    this.regHandeler();
    this.logHandeler();
    this.changeHandler();
    this.setSessionStorage();
  }


  async read() {
    this.account = await $.getJSON("./json/account.json");
  }

  regHandeler() {
    $('main').on('submit', '#reg-form', (event) => this.createNewUser(event));
  }
  logHandeler() {
    $('main').on('submit', '#log-form', (event) => this.logInUser(event));
  }

  logOutHandeler() {
    $('main').on('click', '#log-out-option', () => this.logOutHandeler());
  }

  changeHandler() {
    this.changeListener.on('account.json', () => this.updateAccount());
  }


  async render() {

    if (!this.account) {
      await this.read()
    }
    if (this.tempStore.activeUser) {
      this.activeMember();
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


  logInUser(event) {
    event.preventDefault();
    let activeUser = "";
    let logEmail = $("#log-email").val();
    let logPswrd = $("#log-pswrd").val();

    this.account.forEach(user => {
      if (logEmail === user.Email && logPswrd === user.Password) {
        alert('Inloggning lyckades!');
        this.tempStore.activeUser = user;
        this.tempStore.save();
        
       this.tempStore.activeUser = activeUser;
        this.activeMember(this.tempStore.activeUser);
        return false;
      }  
    });
  }

setSessionStorage() {
  this.tempStore = {};
try {
  this.tempStore = JSON.parse(sessionStorage.store);
} catch (e) { }
this.tempStore.save = function () {
  sessionStorage.store = JSON.stringify(this);
}

  }

  activeMember() {

    $('.nav-right-items').replaceWith( /*html*/ `
    <div class="active-User-Container">
    <div class="menu-divider"></div>
    <p>Välkommen ${this.tempStore.activeUser.Name}!</p>
    <div class="menu-divider"></div>
    <a class="active-user-profile" href="#profilepage">Mina sidor</a>
    <div class="menu-divider"></div>
    <button id="log-out-option">Logga ut</button>
    </div>
    `);


  }

  logOutHandeler() {
    
    console.log('Logged out')
  }

  async updateAccount() {
    if (!window.activeUser) {
      return;
    }

    await this.read();

    this.account.forEach(user => {
      if (window.activeUser.Email === user.Email) {
        window.activeUser = user;
      }
    })
  }
}
