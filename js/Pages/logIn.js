export default class LogIn{

  constructor() {
    this.eventHadeler();
  }

  async read() {
    this.account = await $.getJSON("./json/account.json");
  }


  async render() {
  
    if (!this.account) {
      await this.read()
    }
    console.log(this.account)

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
                <form>
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

  eventHadeler() {
    $('main').on("click", "#crt-btn", () => {
      var newEmail = $('#crt-email').val();
      var newPswrd = $('#crt-pswrd').val();
      var newName = $('#fname').val();
      var newLastName = $('#lname').val();
      console.log(newEmail, newPswrd, newLastName, newName)
      //createNewUser(newEmail, newPswrd, newName, newLastName);
    });
  }

  // createNewUser(newEmail, newPswrd, newName, newLastName) {
  //   let newUserInfo = [newEmail, newPswrd, newName, newLastName];
  //   console.log(newUserInfo);
  // }



}