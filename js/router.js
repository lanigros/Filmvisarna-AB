import ChangeListener from './ChangeListener.js';
// Only create ONE change listener for the whole application
const changeListener = new ChangeListener();

// imported pages
import StartPage from "./Pages/startpage.js";
import DetailedInfoAboutMovie from "./Pages/detailedInfoAboutMovies.js";
import Booking from "./pages/booking.js";
import LogIn from "./Pages/logIn.js";

import Confirmation from "./Pages/confirmation.js";
import ProfilePage from "./Pages/profilepage.js";

// import tempStore (session storage variable)
import bookingTempStore from "./bookingTempStore.js";

// instanciate to reuse instances of pages
const startPage = new StartPage();
const detailedInfoAboutMovie = new DetailedInfoAboutMovie();
const booking = new Booking();
const logIn = new LogIn(changeListener);

const confirmation = new Confirmation();
const profilepage = new ProfilePage();

let temp = '';
let movieTitle = '';
let movieAuditorium, movieDate, movieTime;

export default class Router {

  constructor(selector, changeListener) {
    this.selector = selector;
    this.changeListener = changeListener;
    // main renders on location hash change
    // register the event listener for that:
    window.onhashchange = () => this.setCurrentPage(selector);
    // a global variable used when rendering the correct booking information
    this.bookingJSONFile;
    // create an event listener for the buttons linking to the booking page
    $('body').on('click', '.link-to-booking-page', (event) => this.setBookingFile(event));
    // but also render it right now, based on the current hash or default page
    this.setCurrentPage(selector)
  }

  async setCurrentPage(selector) {
    // we get the page name from the hash part of the url (location.hash)
    // and we remove the # (hash) and any - (dashes)
    // so that something like #product-page would become productpage
    let name = window.location.hash.replace('-', '').replace('#', '');

    temp = name.split('/'); // splitting the long string into an array 
    name = temp[0]; // name is now detailedInfoAboutMovie

    // This is for getting argument for detailed movie page
    movieTitle = temp[1]; // store info to variables and then send those as arguments
    movieAuditorium = temp[2];
    movieDate = temp[3];
    movieTime = temp[4];


    // we check if there is (not) a method with that name (below)
    if (!this[name]) {
      name = 'default'; // if there isn't we will use the method named default
    }
    // we call the method (they are below) and collect the rendered result
    let result = await (this[name])();
    // and finally replace the router selector html with the rendered result
    $(selector).html(result);
  }

  ////////////////
  // Set the booking file being accessed in the session storage and declare if the booking file is different
  async setBookingFile(event) {
    if (!(bookingTempStore.bookingFile === 'booking/' + event.target.id)) {
      bookingTempStore.bookingFile = 'booking/' + event.target.id;
      bookingTempStore.bookingFileHasChanged = true;
      bookingTempStore.save();
    }
  }

  ////////////////
  // Our pages (the method names matches the hashes with any slashes - removed)

  // if we want a new instance every time we visit a page we instanciate here instead


  profilepage() {
    return profilepage.render();
  }

  confirmation() {
    return confirmation.render();
  }

  booking() {
    return booking.render();
  }

  logIn() {
    return logIn.render();
  }

  detailedInfoAboutMovie() {
    return detailedInfoAboutMovie.render(movieTitle, movieAuditorium, movieDate, movieTime); // send arguments so the system knows which movie was clicked
  }

  default() {
    return startPage.render()
  }

}