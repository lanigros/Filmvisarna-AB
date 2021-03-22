export default class Confirmation {

  render(movieDetails, seatArray) {
    if (!movieDetails || !seatArray) {
      return /*html*/`
        <h1>You never booked anything</h1>
      `
    }
    let layout = /*html*/`
      <h1>${movieDetails[0].film}</h1>
    `;
    for (let i = 0; i < seatArray.length; i++) {
      layout += /*html*/`
        <p>${seatArray[i]}</p>
      `
    }

    return layout;
  }

}