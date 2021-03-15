export default class Header {

  render() {
    return /*html*/`
      <div class="nav-container">
        <div class="wrapper">
          <nav>
            <div class="nav-left-items">
              <div class="nav-hamburger">
                <a class="nav-hamburger-container" href="#">
                  <img class="hamburger-btn" src="img/header/hamburger-icon.svg" alt="">
                </a>
              </div>
              <div class="nav-logo">
                <a class="nav-logo-container" href="#">
                  <img class="logo" src="img/header/logo-icon.svg" alt="">
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
    `
  }

}