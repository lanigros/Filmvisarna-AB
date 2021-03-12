let bannerImages;
let bannerTitle;
let bannerText;

getImgFromJson()

async function getImgFromJson() {
  movieInfo = await $.getJSON('/json/movies.json');
  
    renderInfo(movieInfo);
  };
 


function renderInfo() {
 
  $('body').append(`

  <div class="banner-Container">
  <div class="banner-img"><img src="${movieInfo[0].images}"></div>
  <div class="banner-text">
  <div class="banner-title">${movieInfo[0].title}</div>
  <div class="banner-desc">${movieInfo[0].description}</div>
</div>

</div>

`)

}



// $('body').append(`

// <div class="banner-Container">
// <div class="banner-img"></div>

// <div class="banner-text">
// <div class="banner-title"></div>
// <div class="banner-desc"></div>
// </div>

// </div>

// `)

  //  bannerImages = movies[0].images;
  // bannerTitle = movies[0].title;
  // bannerText = movies[0].description;