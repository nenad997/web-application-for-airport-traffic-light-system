export function parseDateString(input) {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  var parts = input.split(" ");

  var day = parseInt(parts[2]);
  var month = months.indexOf(parts[1]);
  var year = parseInt(parts[3]);

  var date = new Date(year, month, day);

  return date;
}

export function getHumanReadableDate(date) {
  return new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
