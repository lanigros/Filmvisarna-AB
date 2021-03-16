export default class LogIn{

  render() {
  
    return `
    
    <div class="Login-Container">
    <div class="Title-Container"><h1>login</h1></div>
      
      <div class="Input-Container>
            <form action="/action_page.php">
              <label for="email">Enter email</label>
              <input type="Email" id="email" name="fname"><br><br>
              <label for="pswrd">Enter password</label>
              <input type="password" id="pswrd" name="lname"><br><br>
              <input type="submit" value="Submit">
            </form>
      </div>
    
    </div>
    
    `
   
  }

}