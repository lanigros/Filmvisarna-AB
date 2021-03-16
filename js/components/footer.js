export default class Footer {

  render() {

    return /*html*/ `
  
    
    <div class="footer_container">
      <div class="footer_logo">      
          <img src="/img/logo/Filmvisarna logo 2.png" alt="Logotype">
          <br /><div class="copyrightTxt">© 2020 Filmvisarna AB. All rights reserved.</div>
      </div>      
      <div class="footer_menu">
        <ul>
          <li><a href="#">Om oss</a></li>
          <li><a href="#">Q&A</a></li>
          <li><a href="#">Hitta hit</a></li>
          <li><a href="#">Kontakt</a></li>
        </ul>
      </div>
      <div class="footer_socialmedia">
        <a href="#"><img onmouseover="this.src='/img/logo/facebook30x30-red.png'" onmouseout="this.src='/img/logo/facebook30x30.png'" src="/img/logo/facebook30x30.png"></a>
        <a href="#"><img onmouseover="this.src='/img/logo/Instagram30x30-red.png'" onmouseout="this.src='/img/logo/Instagram30x30.png'" src="/img/logo/Instagram30x30.png"></a>
        <a href="#"><img onmouseover="this.src='/img/logo/Twitter30x30-red.png'" onmouseout="this.src='/img/logo/Twitter30x30.png'" src="/img/logo/Twitter30x30.png"></a>
      </div>      
      
    </div>
 
  `;

  }
};


// Building the fast arrow button
// $('.body_container').append(`<div class="arrowUp" >
//     <a href="#"><img onmouseover="this.src='/img/logo/arrowUp40x40-red.png'" onmouseout="this.src='/img/logo/arrowUp40x40.png'" src="/img/logo/arrowUp40x40.png"></a>
//       </div>`)
