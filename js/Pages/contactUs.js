export default class ContactUs {

  async read() {
    this.movieInfo = await $.getJSON('/json/movies.json');
  }

  async render() {

    if (!this.movieInfo) {
      await this.read();
    }


    return /*html*/ `
  <div class="container">
  <form action="action_page">

    <label for="fname">Namn:</label>
    <input type="text" id="fname" name="firstname" placeholder="Namn">

    <label for="epost">E-post:</label>
    <input type="text" id="lname" name="epost" placeholder="namn@epost.com">

    <label class="stad"><br>Stad:</label>
    <select id="stad" name="stad">
      <option value="stockholm">Stockholm</option>
      <option value="goteborg">Göteborg</option>
      <option value="malmo">Malmö</option>
    </select>

    <label for="subject">Ärende / Meddelande</label>
    <textarea id="subject" name="subject" placeholder="Skriv ditt meddelande här" style="height:200px"></textarea>

    <input type="skicka" value="Skicka">

  </form>
</div>

  
  `
  }

}
