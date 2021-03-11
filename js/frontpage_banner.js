
async function getMoviesFromJson() {
  let movies;
  await $.getJSON('/json/movies.json', (data) => {
    movies = data;

  });
  
}



$('body').append(`

  <div class="main-banner">
    <h1>Hello</h1>
  </div>

`)