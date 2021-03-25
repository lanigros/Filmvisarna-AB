import ChangeListener from './ChangeListener.js';
// Only create ONE change listener for the whole application
const changeListener = new ChangeListener();

// imported pages
import StartPage from "./Pages/startpage.js";
import DetailedInfoAboutMovie from "./Pages/detailedInfoAboutMovies.js";
import Booking from "./pages/booking.js";
import LogIn from "./Pages/logIn.js";
import ContactUs from "./Pages/contactUS.js";
import Confirmation from "./Pages/confirmation.js";
import ProfilePage from "./Pages/profilepage.js";


// instanciate to reuse instances of pages
const startPage = new StartPage();
const detailedInfoAboutMovie = new DetailedInfoAboutMovie();
const booking = new Booking(changeListener);
const logIn = new LogIn(changeListener);
const contactUs = new ContactUs();
const confirmation = new Confirmation();
const profilepage = new ProfilePage();


export default class Router {

  constructor(selector, changeListener) {
    this.selector = selector;
    this.changeListener = changeListener;
    // main renders on location hash change
    // register the event listener for that:
    window.onhashchange = () => this.setCurrentPage(selector);
    // add variable to read and save session storage
    this.setSessionStorage();
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
  // Create variable to read and save session storage
  setSessionStorage() {
    this.tempStore = {};
    try {
      this.tempStore = JSON.parse(sessionStorage.store);
    } catch (e) { }
    this.tempStore.save = function () {
      sessionStorage.store = JSON.stringify(this);
    }
  }

  // Set the booking file being accessed in the session storage and declare if the booking file is different
  async setBookingFile(event) {
    if (!(this.tempStore.bookingFile === 'booking/' + event.target.id)) {
      changeListener.remove(this.tempStore.bookingFile);
      this.tempStore.bookingFile = 'booking/' + event.target.id;
      this.tempStore.bookingFileHasChanged = true;
      this.tempStore.save();
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
    return detailedInfoAboutMovie.render();
  }

  default() {

    return startPage.render()
  }


  contactUs() {
    return contactUs.render()
  }

}