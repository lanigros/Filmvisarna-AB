export default class FileFunctions {

  static getBookingFile(film, auditorium, date, time) {
    let fileName = "";

    if (film === "Lord of the Rings: The Fellowship of the Ring") {
      fileName += "lrfr-";
    } else if (film === "The Dark Knight") {
      fileName += "dn-";
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
}