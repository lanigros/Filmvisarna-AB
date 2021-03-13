/*This is where we import what we always want to be rendered, no matter what page we currently visit, so for example
on this page, it would be a good idea to import the header, the router and the footers since we always want them to be visible.
When we order tickets, create a new profile, when we want to see the list of movies that roll, we want the footer and header to be visible.*/

/* So in other words, to keep it very simplified, app will only render basically 3 things,
header / router / footer.

What this means for us when we build on the site is that no matter what page we want to render through router, the header and footer will 
be completely unaffected by the styling of our pages.*/


// import Header from './components/Header.js';  (This is what we import when we get Matts header)

import Router from './router.js';
import Footer from './components/footer.js';

export default class App {

  constructor() {
    // render partials

    // header renders now
    $('header').html(new Header().render())

    // main renders in its router, on instanciation
    this.router = new Router('main');

  }

}