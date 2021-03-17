

const isWeekend = day => {
  return day % 7 === 6 || day % 7 === 0;
}

const getDayName = day => {

  const date = new Date(2021, 3, day);
  console.log(date);

  return new Intl.DateTimeFormat("sv-SE", { weekday: "short" }).format(date);

}



export { isWeekend, getDayName };