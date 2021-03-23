export default class ContactUs {

  async read() {
    this.movieInfo = await $.getJSON('/json/movies.json');
  }

  async render() {

    if (!this.movieInfo) {
      await this.read();
    }


    return /*html*/ `
    <div class="centerText">
    <h1 class="contactTitle">Kontakta oss<h1>
    <p class="textUnderTitle">Kundtjänst via email: support@filmvisarna.se eller via kontaktformuläret.

<br>Kontakta oss gärna om du har några frågor! Vi försöker alltid svara så snabbt vi kan.

<br>Om din fråga angår returnering av en produkt, titta gärna under våra kundtjänst-flikar där mer information om hur du gör en retur finns.
</p>
<p class="adress">Filmvisarna se Sverige AB
<br>Box 829
<br>391 28 Stockholm
<br>Sverige
<br>Org.nr: 55X444-4XX3</p>
</div>
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

    <button type="button" onclick="alert('Ditt meddelande har skickats')">Skicka</button>

  </form>
</div>

  
  `
  }

}
