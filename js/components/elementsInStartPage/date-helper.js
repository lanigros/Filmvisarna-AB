

const isWeekend = day => {
  return day % 7 === 6 || day % 7 === 0;
}

const getDayName = day => {

  const date = new Date(2021, 3, day);
  console.log(date);

  return new Intl.DateTimeFormat("sv-SE", { weekday: "short" }).format(date);
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function getCurrentMonthInString() {
  return new Date().toLocaleString('default', { month: 'long' });
}

function getCurrentMonthInNumber() {
  return new Date().getMonth();
}

function getCurrentYear() {
  return new Date().getFullYear();
}

export { isWeekend, getDayName, getDaysInMonth, getCurrentMonthInString, getCurrentMonthInNumber, getCurrentYear };