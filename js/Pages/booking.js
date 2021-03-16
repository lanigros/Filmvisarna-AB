export default class Booking {

  seating = [
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

  render() {
    let layout = /*html*/`
      <div class="seating-container">
    `
    for (let i = 0; i < this.seating.length; i++) {
      layout += /*html*/`
        <div class="row">
      `
      for (let j = 0; j < this.seating[i].length; j++) {
        if (this.seating[i][j] === 0) {
          layout += /*html*/`
            <input type="checkbox">
          `
        } else if (this.seating[i][j] === 1) {
          layout += /*html*/`
            <input type="checkbox" disabled>
          `
        }
      }
      layout += /*html*/`
        </div>
      `
    }

    layout += /*html*/`
      </div>
    `

    return layout;
  }

}