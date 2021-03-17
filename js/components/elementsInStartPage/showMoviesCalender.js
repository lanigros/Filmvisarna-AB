export default class ShowMovieCalender {

  async read() {
    this.movieInfo = await $.getJSON('/json/movies.json');
  }

}