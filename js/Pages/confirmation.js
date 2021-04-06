import bookingTempStore from '../bookingTempStore.js';

export default class Confirmation {

  render() {
    if (!bookingTempStore.bookingFile || bookingTempStore.latestBookedSeats.length < 1) {
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
            <p> ${bookingTempStore.showingDetails.film}</p>
          </div>
          <div class="row">
            <h2>Datum: </h2>
            <p> ${bookingTempStore.showingDetails.date}</p>
          </div>
          <div class="row">
            <h2>Tid: </h2>
            <p> ${bookingTempStore.showingDetails.time}</p>
          </div>
          <div class="row">
            <h2>Salong: </h2>
            <p> ${bookingTempStore.showingDetails.auditorium}</p>
          </div>
            <div class="row">
            <h2>Plats: </h2>
    `;

    for (let i = 0; i < bookingTempStore.latestBookedSeats.length; i++) {
      if (i === 0) {
        layout += /*html*/`
          <p> ${bookingTempStore.latestBookedSeats[i]}</p>
        `;
      } else {
        layout += /*html*/`
          <p>, ${bookingTempStore.latestBookedSeats[i]}</p>
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

}