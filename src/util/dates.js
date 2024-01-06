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

  // Razdvajanje stringa na osnovu razmaka
  var parts = input.split(" ");

  // Dobijanje vrednosti dana, meseca i godine
  var day = parseInt(parts[2]);
  var month = months.indexOf(parts[1]);
  var year = parseInt(parts[3]);

  // Kreiranje Date objekta
  var date = new Date(year, month, day);

  return date;
}
