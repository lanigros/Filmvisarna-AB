   let tempStore = {};

  function setLocalStorage() {
  
    try {
      tempStore = JSON.parse(sessionStorage.store);
    } catch (e) { }
      tempStore.save = function () {
      sessionStorage.store = JSON.stringify(this);
    }
}
  
setLocalStorage();
export default tempStore;