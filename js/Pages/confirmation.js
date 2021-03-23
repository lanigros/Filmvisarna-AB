export default class Confirmation {

  render(movieDetails, seatArray) {
    if (!movieDetails || !seatArray) {
      document.location.href = "/";
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
            <p>${movieDetails[0].film}</p>
          </div>
          <div class="row">
            <h2>Datum: </h2>
            <p>${movieDetails[0].date}</p>
          </div>
          <div class="row">
            <h2>Tid: </h2>
            <p>${movieDetails[0].time}</p>
          </div>
          <div class="row">
            <h2>Salong: </h2>
            <p>${movieDetails[0].auditorium}</p>
          </div>
            <div class="row">
            <h2>Plats: </h2>
    `;

    for (let i = 0; i < seatArray.length; i++) {
      if (i === 0) {
        layout += /*html*/`
          <p>${seatArray[i]}</p>
        `;
      } else {
        layout += /*html*/`
          <p>, ${seatArray[i]}</p>
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