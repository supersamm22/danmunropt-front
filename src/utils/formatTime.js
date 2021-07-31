import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate() {
  return format(new Date(), 'dd-MM-yyyy');
}
export function week() {
  const todaydate = new Date();
  const oneJan = new Date(todaydate.getFullYear(), 0, 1);
  var numberOfDays = Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000));
  const result = Math.ceil((todaydate.getDay() + 1 + numberOfDays) / 7);
  return result
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
