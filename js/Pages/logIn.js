export default class LogIn{

  render() {
  
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

}