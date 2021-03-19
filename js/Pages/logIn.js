export default class LogIn {

  constructor() {
    this.regHandeler();
    this.logHandeler();
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

 

  async createNewUser(event) {
    event.preventDefault();
    let newEmail = $("#crt-email").val();
    let newPswrd = $("#crt-pswrd").val();
    let newName = $("#fname").val();
    let newLastName = $("#lname").val();
    
    let newUserInfo = ({ Email: newEmail, Password: newPswrd, Name: newName, Lastname: newLastName });
    this.account.push(newUserInfo);
    await JSON._save('account.json', this.account);
    console.log('New account was successfully created!')
    alert('Ditt konto har skapats!')
  }

  logInUser(event) {
    event.preventDefault();
   
    let logEmail = $("#log-email").val();
    let logPswrd = $("#log-pswrd").val();
      
      this.account.forEach(user => {
        if (logEmail === user.Email && logPswrd === user.Password) {
          console.log('Login success!');
        } else
          console.log('Log in failed.');
    });

    

  }

}