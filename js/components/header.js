export default class Header {

  render() {

    let heightPercent = 80;

    this.buildHeaderStructure();
    this.buildSideNav();
    this.buildLogInButtons();
    $(window).resize(this.buildLogInButtons);
  }

  buildHeaderStructure() {

    $('header').html(`

    <div class="nav-container">        
          <nav class="main-nav">
            
              <div class="nav-hamburger">
                <a class="nav-hamburger-container" onclick="document.getElementById('mySidenav').style.width = '440px';">
                  <img class="hamburger-btn" src="img/header/hamburger-icon.svg" alt="">
                </a>
              </div>
              <div class="nav-logo">
                <a class="nav-logo-container" href="#">
                  <img class="logo" src="img/logo/Filmvisarna logo 2.png" alt="logo">
                </a>
            
            </div>
            <div class="nav-right-items">              
            </div>
          </nav>       
      </div>   
    
    `)

  }

  buildSideNav() {
    $('header').append(`

    <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="document.getElementById('mySidenav').style.width = '0';">&times;</a>
        <a href="#" onclick="document.getElementById('mySidenav').style.width = '0';">
          <img class="alert-icon" src="img/side-nav/alert-icon.svg" alt="">
          NYHETER
        </a>
        <a href="#" onclick="document.getElementById('mySidenav').style.width = '0';">
          <img class="alert-icon" src="img/side-nav/movie-icon.svg" alt="">
          FILMER
        </a>
        <a href="#" onclick="document.getElementById('mySidenav').style.width = '0';">
          <img class="alert-icon" src="img/side-nav/ticket-icon.svg" alt="">
          BILJETTER
        </a>
        <a href="#" onclick="document.getElementById('mySidenav').style.width = '0';">
          <img class="alert-icon" src="img/side-nav/map-icon.svg" alt="">
          HITTA HIT
        </a>
        <a href="#logIn" onclick="document.getElementById('mySidenav').style.width = '0';">
          <img class="alert-icon" src="img/side-nav/vector-icon.svg" alt="">
          LOGGA IN
        </a>

      </div>
    
    `)
  }

  buildLogInButtons() {

    if (window.innerWidth > 760) {
      $('.nav-right-items').html(`
      <div class="logIn_container">    
        <div class="nav-login-btn"><a class="nav-login-container" href="#logIn" onclick="document.getElementById('mySidenav').style.width = '0';">LOGGA IN</a></div>
        <div><a class="nav-create-container" href="#logIn" onclick="document.getElementById('mySidenav').style.width = '0';">NYTT KONTO</a></div>
      </div>       
      `)

    }

    if (window.innerWidth <= 760) {
      $('.nav-right-items').html(`
      `)
    }
  }

}