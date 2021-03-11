
async function getMoviesFromJson() {
  let movies;
  await $.getJSON('/json/movies.json', (data) => {
    movies = data;

  });
  
}


function addMainBanner{
  let mainBanner = <div class="mainBanner"></div>;
  $('.mainBanner').append(`
  
  `)
}
