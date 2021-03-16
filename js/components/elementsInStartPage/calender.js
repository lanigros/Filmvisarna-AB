export default class Calender {

  async read() {
    this.movieInfo = await $.getJSON('/json/movies.json');
  }

  async render() {

    let test = this.buildCalender();
    console.log(test);

    if (!this.movieInfo) {
      await this.read();
    }

    return /*html*/ `
    <div class="calander-Container">
      <div class="calender">
        
      </div>        
    </div >
  `
  }

  buildCalender() {

    console.log("build calander")

    let calender = $('.calender');

    for (let day = 1; day <= 31; day++) {
      calender.append(< div class="day" > ${day}</div >);
    }

    return calender;

  }

}

