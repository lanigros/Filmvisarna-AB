
let bannerImages;

getImgFromJson()

async function getImgFromJson() {
  bannerImages = await $.getJSON('/json/movies.json');
  let test = bannerImages[3].title
  console.log('111 '+ test)
}



/*$('body').append(`

<div class="banner-Container">

<div class="banner-img"></div>

<div class="banner-text"><h1>Hello</h1>
<p>Innuti denna ska vi lägga en bild som en nice titel och brödtext med en beskrivning om filmen</p></div>


</div>
`)*/
