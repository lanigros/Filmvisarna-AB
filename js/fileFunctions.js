export default class FileFunctions {

  static getBookingFile(film, auditorium, date, time) {
    let fileName = "";

    if (film === "Lord of the Rings: The Fellowship of the Ring") {
      fileName += "lrfr-";
    } else if (film === "The Dark Knight") {
      fileName += "dk-";
    } else if (film === "Inception") {
      fileName += "in-";
    } else if (film === "Matrix") {
      fileName += "mx-";
    } else if (film === "Parasite") {
      fileName += "pt-";
    } else {
      return;
    }

    if (auditorium === "Lilla Salongen") {
      fileName += "ls-";
    } else if (auditorium === "Stora Salongen") {
      fileName += "ss-";
    } else {
      return;
    }

    fileName += date.replaceAll('-', '').substring(2) + "-";

    fileName += time.replaceAll('.', '');

    return fileName += '.json';
  }
  /* A function used to create JSON files for each individual movie on the schedule */
  /*static async createBookingJSONs() {
    let bookings = await $.getJSON("/json/movieSchedule.json");

    for (let i = 0; i < bookings.length; i++) {
      let details = bookings[i];
      let fileName = this.getBookingFile(details.film, details.auditorium, details.date, details.time);

      if (details.auditorium === "Lilla Salongen") {
        details.seating = [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
      } else {
        details.seating = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
      }

      this.download(fileName, '[' + JSON.stringify(details) + ']');
    }
  }*/

  /* A function used to create and download a file to your local computer without using node.js */
  /*static download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }*/

}