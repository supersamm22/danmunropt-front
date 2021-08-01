import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(d = new Date()) {
  console.log(d)
  return format(d, 'dd-MM-yyyy');
}
export function week() {
  const todaydate = new Date();
  const oneJan = new Date(todaydate.getFullYear(), 0, 1);
  var numberOfDays = Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000));
  const result = Math.ceil((todaydate.getDay() + 1 + numberOfDays) / 7);
  return result
}
export function addDays(date, days) {
  console.log(date)
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
export function startOfWeek(week, year) {
  var d = new Date("Jan 01, " + year + " 01:00:00");
  var dayMs = (24 * 60 * 60 * 1000);
  var offSetTimeStart = dayMs * (d.getDay() - 1);
  var w = d.getTime() + 604800000 * (week - 2) - offSetTimeStart; //reducing the offset here
  var n1 = new Date(w);
  return n1
}


export function year() {
  const todaydate = new Date();
  return todaydate.getFullYear()
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}
