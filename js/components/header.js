export default class Header {

  render() {
    return /*html*/`
      <div class="nav-container">
        <div class="wrapper">
          <nav>
            <div class="nav-left-items">
              <div class="nav-hamburger">
                <a class="nav-hamburger-container" onclick="document.getElementById('mySidenav').style.width = '440px';">
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
        <a href="#">
          <img class="alert-icon" src="img/side-nav/alert-icon.svg" alt=""></img>
          NYHETER
        </a>
        <a href="#">
          <img class="alert-icon" src="img/side-nav/movie-icon.svg" alt=""></img>
          FILMER
        </a>
        <a href="#">
          <img class="alert-icon" src="img/side-nav/ticket-icon.svg" alt=""></img>
          BILJETTER
        </a>
        <a href="#">
          <img class="alert-icon" src="img/side-nav/map-icon.svg" alt=""></img>
          HITTA HIT
        </a>
        <a href="#">
          <img class="alert-icon" src="img/side-nav/vector-icon.svg" alt=""></img>
          PROFIL
        </a>
      </div>
    `
  }

}