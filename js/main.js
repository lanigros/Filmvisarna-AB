
//Building the body constructor
$('body').append('<div class="body_container"></div>');

//Building the main content 
$('.body_container').append('<div class="main_content"></div>');
$('.main_content').append('<div class="highlighed_movie"></div>');
$('.highlighed_movie').append('<img src="/img/movieimg/LordOfTheRings-Banner.jpg"></img>');
$('.highlighed_movie').append('<div class="highlighed_movie_info"></div>');
$('.highlighed_movie_info').append('<p>Hejdgsgdfhådhdf</p>');

//Building the footer
$.getScript("/js/footer.js", function () { renderFooter(); })

//Building the fast arrow button
$('.body_container').append(`<div class="arrowUp" >
    <a href="#"><img onmouseover="this.src='/img/logo/arrowUp40x40-red.png'" onmouseout="this.src='/img/logo/arrowUp40x40.png'" src="/img/logo/arrowUp40x40.png"></a>
      </div>`)
