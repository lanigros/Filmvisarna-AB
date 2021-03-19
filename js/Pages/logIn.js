export default class LogIn{

  constructor() {
    this.eventHandeler();
    this.createNewUser();
  }

  async read() {
    this.account = await $.getJSON("./json/account.json");
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
            <form>
              <input type="Email" placeholder="Email adress" id="log-email" name="email" required>
              <br>
              <input type="password" placeholder="Lösenord" id="log-pswrd" name="pswrd" required>
              <br>
              <input type="submit" value="Logga in" id="sub-btn">
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

  eventHandeler() {

    $('main').on("submit", "#reg-form", (event) => {
      event.preventDefault();
      var newEmail = $("#crt-email").val();
      var newPswrd = $("#crt-pswrd").val();
      var newName = $("#fname").val();
      var newLastName = $("#lname").val();

      let newUserInfo = ({ Email: newEmail, Password: newPswrd, Name: newName, Lastname: newLastName });

      
      this.createNewUser(newUserInfo);
      
      
      
    });
  }

   async createNewUser(info) {
     
     console.log(info);

     let test = JSON.stringify(info)
     console.log(test)
     
     this.account[0].push(test)

     console.log(account)
    
    
    //var completeInfo = JSON.parse(info);
     //console.log(completeInfo)
    
     //newUser.this.account.push({ newUserInfo });
    // account[0]
     //await JSON._save('./json/account.json', this.account);
   }



}

/*<input type="submit" value="Skapa" id="crt-btn">*/

// yourObj.theTeam.push({"teamId":"4","status":"pending"});