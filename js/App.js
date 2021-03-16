import Header from './components/header.js';
import Router from './router.js';
import Footer from './components/footer.js';

export default class App {

  constructor() {
    // render partials

    // header renders now
    $('header').html(new Header().render());

    // main renders in its router, on instanciation
    this.router = new Router('main');

    $('footer').html(new Footer().render());

  }

}