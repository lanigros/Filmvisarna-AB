export default class LogIn{

  render() {
  
    return `
    
    <div class="Login-Container">
    <div class="Login-wrapper">
    <div class="Title-Container"><h1>login</h1></div>
      
      <div class="Input-Container">
            <form>
              <input type="Email" placeholder="Email adress" id="email" name="email" required>
              <br>
              <input type="password" placeholder="Password" id="pswrd" name="pswrd" required>
              <br>
              <input type="submit" value="Logga in" id="sub-btn">
            </form>
        </div>
     </div>
    </div>
    
    `
   
  }

}