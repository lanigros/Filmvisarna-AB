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

    <label for="lname">E-post:</label>
    <input type="text" id="lname" name="epost" placeholder="namn@epost.com">

    <label for="country">Stad</label>
    <select id="country" name="country">
      <option value="australia">Stockholm</option>
      <option value="canada">Göteborg</option>
      <option value="usa">Malmö</option>
    </select>

    <label for="subject">Ärende / Meddelande</label>
    <textarea id="subject" name="subject" placeholder="Skriv ditt meddelande här" style="height:200px"></textarea>

    <input type="skicka" value="Skicka">

  </form>
</div>

  
  `
  }

}
