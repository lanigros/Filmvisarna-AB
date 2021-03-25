export default class Confirmation {

  render() {
    this.setSessionStorage();
    if (!this.tempStore.bookingFile || this.tempStore.bookingLatestBookedSeats.length < 1) {
      document.location.href = "#profilepage";
      return;
    }
    let layout = /*html*/`
      <div class="confirmation-container">
        <div></div>
        <div class="text-container">
          <div class="buffer-row"></div>
          <div class="title-row">
            <h1>Bekräftelsedetaljer</h1>
          </div>
          <div class="row">
            <h2>Film: </h2>
            <p>${this.tempStore.bookingShowingDetails.film}</p>
          </div>
          <div class="row">
            <h2>Datum: </h2>
            <p>${this.tempStore.bookingShowingDetails.date}</p>
          </div>
          <div class="row">
            <h2>Tid: </h2>
            <p>${this.tempStore.bookingShowingDetails.time}</p>
          </div>
          <div class="row">
            <h2>Salong: </h2>
            <p>${this.tempStore.bookingShowingDetails.auditorium}</p>
          </div>
            <div class="row">
            <h2>Plats: </h2>
    `;

    for (let i = 0; i < this.tempStore.bookingLatestBookedSeats.length; i++) {
      if (i === 0) {
        layout += /*html*/`
          <p>${this.tempStore.bookingLatestBookedSeats[i]}</p>
        `;
      } else {
        layout += /*html*/`
          <p>, ${this.tempStore.bookingLatestBookedSeats[i]}</p>
        `;
      }
    }

    layout += /*html*/`
          </div>
          <div class="buffer-row"></div>
        </div>
        <div></div>
      </div>
    `;

    return layout;
  }

  setSessionStorage() {
    this.tempStore = {};
    try {
      this.tempStore = JSON.parse(sessionStorage.store);
    } catch (e) { }
    this.tempStore.save = function () {
      sessionStorage.store = JSON.stringify(this);
    }
  }

}