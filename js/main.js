
//Building the body constructor
$('body').append('<div class="body_container"></div>');

$('.body_container').append('<div class="test_container"></div>');

 $.getScript("/js/frontpage_banner.js", function () { renderInfo(); })

//Building the footer
$.getScript("/js/footer.js", function () { renderFooter(); })

