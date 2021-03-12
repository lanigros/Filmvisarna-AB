
//Building the body constructor
$('body').append('<div class="body_container"></div>');

$('.body_container').append('<div class="test_container"></div>');

 $.getScript("/js/frontpage_banner.js", function () { renderInfo(); })

//Building the footer
$.getScript("/js/footer.js", function () { renderFooter(); })

//Building the fast arrow button
$('.body_container').append(`<div class="arrowUp" >
    <a href="#"><img onmouseover="this.src='/img/logo/arrowUp40x40-red.png'" onmouseout="this.src='/img/logo/arrowUp40x40.png'" src="/img/logo/arrowUp40x40.png"></a>
      </div>`)

