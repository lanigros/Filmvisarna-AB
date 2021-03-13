getImgFromJson();


async function getImgFromJson() {
  movieInfo = await $.getJSON('/json/movies.json');
  
  renderInfo(movieInfo);
  };
 


function renderInfo() {
 
  $('.hero-banner').append(`

<div class="banner-Container">
  <img src="${movieInfo[0].images}">
    <div class="banner-text">
      <div class="banner-title"><h1>${movieInfo[0].title}</h1></div>
      <div class="banner-desc"><p>${movieInfo[0].description}</p></div>
    </div>
        <button class="order-btn">Se trailer</button>
    
</div>

`);

};
