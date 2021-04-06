let bookingTempStore = {};

function setSessionStorage() {

  try {
    bookingTempStore = JSON.parse(sessionStorage.bookingStore);
  } catch (e) { }
  bookingTempStore.save = function () {
    sessionStorage.bookingStore = JSON.stringify(this);
  }
}

setSessionStorage();
export default bookingTempStore;