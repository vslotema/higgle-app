export function getWeek(date) {
  //define a date object variable that will take the current system date
  var date1 = new Date(date);

  //find the year of the current date
  var oneJan = new Date(date1.getFullYear(), 0, 1);

  // calculating number of days in given year before a given date
  var numberOfDays = Math.floor((date1 - oneJan) / (24 * 60 * 60 * 1000));

  // adding 1 since to current date and returns value starting from 0
  var result = Math.ceil((date1.getDay() + 1 + numberOfDays) / 7);

  return result;
}

const Calendar = () => {
  return <></>;
};

export default Calendar;
