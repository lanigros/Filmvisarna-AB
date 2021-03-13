
//Building the body constructor
$('body').append('<div class="body_container"></div>');


//Adding the banner js
$('.body_container').append('<div class="hero-banner"></div>');

$.getScript("/js/frontpage_banner.js");

//Building the footer
$.getScript("/js/footer.js", function () { renderFooter(); })

//Building the fast arrow button
$('.body_container').append(`<div class="arrowUp" >
    <a href="#"><img onmouseover="this.src='/img/logo/arrowUp40x40-red.png'" onmouseout="this.src='/img/logo/arrowUp40x40.png'" src="/img/logo/arrowUp40x40.png"></a>
      </div>`)

