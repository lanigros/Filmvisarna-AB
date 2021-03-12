export default class Header {

  constructor() {
    $('header').html(/*html*/`
      <div class="nav-container">
        <div class="wrapper">
          <nav>
            <div class="nav-left-items">
              <div class="nav-hamburger">
                <a class="nav-hamburger-container">
                  <img class="hamburger-btn" src="images/hamburger-icon.svg" alt=""></img>
                </a>
              </div>
              <div class="nav-logo">
                <a class="nav-logo-container">
                  <img class="logo" src="images/logo-icon.svg" alt=""></img>
                </a>
              </div>
            </div>
            <div class="nav-right-items">
              <div>
                <a class="nav-login-container">LOGGA IN</a>
              </div>
              <div>
                <a class="nav-create-container">NYTT KONTO</a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    `)
  }

}