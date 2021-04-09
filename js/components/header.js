import tempStore from '../tempStore.js'; // session storage variable for logged-in user


export default class Header {

  render() {
    this.buildHeaderStructure();
    this.buildSideNav();
    this.buildLogInButtons();
    this.eventHandeler();
  }

  buildHeaderStructure() {
    $('header').html(`
    <div class="nav-container">        
          <nav class="main-nav">            
              <div class="nav-hamburger">
                <a class="nav-hamburger-container" onclick="document.getElementById('mySidenav').style.visibility = 'visible';">
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
          <div id="mySidenav" class="sidenav">
          </div>
      </div>       
    `)
  }

  buildSideNav() {

    if (tempStore.currentTester) {

      $('.sidenav').html(/*html*/`
      
          <a href="javascript:void(0)" class="closebtn" onclick="document.getElementById('mySidenav').style.visibility = 'hidden';">&times;</a>
          <a href="#" onclick="document.getElementById('mySidenav').style.visibility = 'hidden';">
            <img class="alert-icon" src="img/side-nav/alert-icon.svg" alt="">
          <p>NYHETER</p>
          </a>
          <a href="#" onclick="document.getElementById('mySidenav').style.visibility = 'hidden';">
            <img class="alert-icon" src="img/side-nav/movie-icon.svg" alt="">
            <p>FILMER</p>
          </a>
          <a href="#bookTickets" onclick="document.getElementById('mySidenav').style.visibility = 'hidden';">
            <img class="alert-icon" src="img/side-nav/ticket-icon.svg" alt="">
          <p>BILJETTER</p>
          </a>
          <a href="#" onclick="document.getElementById('mySidenav').style.visibility = 'hidden';">
            <img class="alert-icon" src="img/side-nav/map-icon.svg" alt="">
            <p>HITTA HIT</p>
          </a>
          <a class="logInBtnHamburgerMenu" href="#profilepage" onclick="document.getElementById('mySidenav').style.visibility = 'hidden';">
            <img class="alert-icon" src="img/side-nav/vector-icon.svg" alt="">
            <p>MINA SIDOR</p>
          </a>
          <a class="logOutBtnHamburgerMenu" href="#logIn" onclick="document.getElementById('mySidenav').style.visibility = 'hidden';">
            <img class="alert-icon" src="img/side-nav/vector-icon.svg" alt="">
            <p>LOGGA UT</p>
          </a>          
    `)
    }
    else {

      $('.sidenav').html(/*html*/`
    
        <a href="javascript:void(0)" class="closebtn" onclick="document.getElementById('mySidenav').style.visibility = 'hidden';">&times;</a>
        <a href="#" onclick="document.getElementById('mySidenav').style.visibility = 'hidden';">
          <img class="alert-icon" src="img/side-nav/alert-icon.svg" alt="">
         <p>NYHETER</p>
        </a>
        <a href="#" onclick="document.getElementById('mySidenav').style.visibility = 'hidden';">
          <img class="alert-icon" src="img/side-nav/movie-icon.svg" alt="">
          <p>FILMER</p>
        </a>
        <a href="#" onclick="document.getElementById('mySidenav').style.visibility = 'hidden';">
          <img class="alert-icon" src="img/side-nav/ticket-icon.svg" alt="">
         <p>BILJETTER</p>
        </a>
        <a href="#" onclick="document.getElementById('mySidenav').style.visibility = 'hidden';">
          <img class="alert-icon" src="img/side-nav/map-icon.svg" alt="">
          <p>HITTA HIT</p>
        </a>
        <a class="logInBtnHamburgerMenu" href="#logIn" onclick="document.getElementById('mySidenav').style.visibility = 'hidden';">
          <img class="alert-icon" src="img/side-nav/vector-icon.svg" alt="">
          <p>LOGGA IN</p>
        </a>   
         
    `)
    }
  }

  buildLogInButtons() {

    if (window.innerWidth > 760) {
      $('.nav-right-items').html(/*html*/`
      <div class="logIn_container">    
        <div class="nav-login-btn"><a class="nav-login-container" href="#logIn" onclick="document.getElementById('mySidenav').style.visibility = 'hidden';">LOGGA IN</a></div>
        <div><a class="nav-create-container" href="#logIn" onclick="document.getElementById('mySidenav').style.visibility = 'hidden';">NYTT KONTO</a></div>
      </div>       
      `)
      $('.active-User-Container').css("display", "flex");
    }

    if (window.outerWidth <= 760) {
      $('.nav-right-items').html(`
      `)
      $('.active-User-Container').css("display", "none");
    }
  }

  renderLogInBtnInHamburgerMenu() {

    if (tempStore.currentTester) {
      $('.logInBtnHamburgerMenu').html(`
          <img class="alert-icon" src="img/side-nav/vector-icon.svg" alt="">
          <p>MINA SIDOR</p>
        `)
      $('.logInBtnHamburgerMenu').prop("href", "#profilepage");
    }
    else {
      $('.logInBtnHamburgerMenu').html(`
          <img class="alert-icon" src="img/side-nav/vector-icon.svg" alt="">
          <p>LOGGA IN</p>
        `)
      $('.logInBtnHamburgerMenu').prop("href", "#logIn");
    }
  }

  eventHandeler() {
    $('header').on("click", () => this.buildSideNav());
    $('.sidenav').on("click", ".logOutBtnHamburgerMenu", () => this.logOutFromHamburgerMenu());
    $(window).resize(this.buildLogInButtons);
  }

  logOutFromHamburgerMenu() {
    delete tempStore.currentTester;
    tempStore.save();

    $('.active-User-Container').replaceWith( /*html*/ `
      <div class="nav-right-items">
        <div>
            <a class="nav-login-container" href="#logIn" onclick="document.getElementById('mySidenav').style.visibility = 'hidden'">LOGGA IN</a>
        </div>
        <div>
          <a class="nav-create-container" href="#logIn" onclick="document.getElementById('mySidenav').style.visibility = 'visible'">NYTT KONTO</a>
        </div>
      </div>     
    `);

  }


}