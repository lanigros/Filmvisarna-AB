

const isWeekend = day => {
  return day % 7 === 6 || day % 7 === 0;
}

const getDayName = day => {
  const date = new Date(2021, 3, day);
  return new Intl.DateTimeFormat("sv-SE", { weekday: "short" }).format(date);
}

//This returns how many days in total it is in current month
function getDaysInMonth(month) {
  return new Date(2021, month, 0).getDate();

}

function getCurrentMonthInString() {
  return new Date().toLocaleString('default', { month: 'long' });
}

function getCurrentMonthInNumber() {
  return new Date().getMonth() + 1;
}

function getCurrentYear() {
  return new Date().getFullYear();
}

function calcStartDayOfSpecificMonth(month) {
  const date = new Date(2021, month - 1, 1);

  let x = Intl.DateTimeFormat("sv-SE", { weekday: "short" }).format(date);

  switch (x) {
    case "mån":
      return 0;
    case "tis":
      return 1;
    case "ons":
      return 2;
    case "tors":
      return 3;
    case "fre":
      return 4;
    case "lör":
      return 5;
    case "sön":
      return 6;
  }
}

//@param = a number that represents a month
//Returns a string e.g. "Jan"
function getThePickedMonth(month) {
  let listOfMonth = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return listOfMonth[month - 1];
}

export { isWeekend, getDayName, getDaysInMonth, getCurrentMonthInString, getCurrentMonthInNumber, getCurrentYear, getThePickedMonth, calcStartDayOfSpecificMonth };