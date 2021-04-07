let tempStore = {};

function setLocalStorage() {

  try {
    tempStore = JSON.parse(sessionStorage.logInStore);
  } catch (e) { }
  tempStore.save = function () {
    sessionStorage.logInStore = JSON.stringify(this);
  }
}

setLocalStorage();
export default tempStore;