import ChangeListener from './ChangeListener.js';
// Only create ONE change listener for the whole application
const changeListener = new ChangeListener();

// imported pages
import FrontPage from "./pages/FrontPage.js";
import Page1 from "./pages/Page1.js";
import Page2 from "./pages/Page2.js";
import PeoplePage from "./pages/PeoplePage.js";

// instanciate to reuse instances of pages
const frontPage = new FrontPage();
const page1 = new Page1();
const peoplePage = new PeoplePage(changeListener);


export default class Router{

  constructor(selector, changeListener){
    this.selector = selector;
    this.changeListener = changeListener;
    // main renders on location hash change
    // register the event listener for that:
    window.onhashchange = () => this.setCurrentPage(selector);
    // but also render it right now, based on the current hash or default page
    this.setCurrentPage(selector)
  }

  async setCurrentPage(selector){
    // we get the page name from the hash part of the url (location.hash)
    // and we remove the # (hash) and any - (dashes)
    // so that something like #product-page would become productpage
    let name = window.location.hash.replace('-','').replace('#','');
    // we check if there is (not) a method with that name (below)
    if(!this[name]){
      name = 'default'; // if there isn't we will use the method named default
    }
    // we call the method (they are below) and collect the rendered result
    let result = await (this[name])();
    // and finally replace the router selector html with the rendered result
    $(selector).html(result);
  }


  ////////////////
  // Our pages (the method names matches the hashes with any slashes - removed)

  page1(){
    return page1.render();
  }

  page2(){
    // if we want a new instance every time we visit a page we instanciate here instead
    return new Page2().render();
  }

  async peoplepage(){
    return await peoplePage.render();
  }

  default(){
    return frontPage.render()
  }
}