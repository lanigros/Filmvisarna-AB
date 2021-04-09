

export default class BookTickets {

  constructor() {

  }

  async read() {

    this.auditoriums = await $.getJSON("./json/auditoriums.json")
    console.log(this.auditoriums);
    console.log(this.auditoriums[0].seatsPerRow[0]);

  }


  renderBookTicketsSite() {

    /* this.read(); */
    this.addingATheaterToJSON();
    this.readingTheJSONfile();


    $('main').html(`  
    
    `)
  }


  renderTheSeats() {



  }

  async addingATheaterToJSON() {

    let auditoriums = await JSON._load('auditoriums.json');

    let macDeluxe = ({

      name: "MacDeluxe",
      seats: " ",
      seatsPerRow: [
        8,
        8,
        8,
        8
      ]

    });

    let data = JSON.stringify(macDeluxe);
    await JSON._save('auditoriums.json', data);

  }

  async readingTheJSONfile() {
    let auditoriums = await JSON._load('auditoriums.json');
    var test = JSON.parse(auditoriums);
    console.log(test);
  }


}

