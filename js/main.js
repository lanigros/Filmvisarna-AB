
//Building the body constructor
$('body').append('<div class="body_container"></div>');

//Building the footer
$.getScript("/js/footer.js", function () { renderFooter(); })