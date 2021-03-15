export default class Header {

  render() {
    return /*html*/`
      <div class="nav-container">
        <div class="wrapper">
          <nav>
            <div class="nav-left-items">
              <div class="nav-hamburger">
                <a class="nav-hamburger-container" onclick="document.getElementById('mySidenav').style.width = '250px';">
                  <img class="hamburger-btn" src="img/header/hamburger-icon.svg" alt=""></img>
                </a>
              </div>
              <div class="nav-logo">
                <a class="nav-logo-container" href="#">
                  <img class="logo" src="img/header/logo-icon.svg" alt=""></img>
                </a>
              </div>
            </div>
            <div class="nav-right-items">
              <div>
                <a class="nav-login-container" href="#">LOGGA IN</a>
              </div>
              <div>
                <a class="nav-create-container" href="#">NYTT KONTO</a>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="document.getElementById('mySidenav').style.width = '0';">&times;</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
    `
  }

}