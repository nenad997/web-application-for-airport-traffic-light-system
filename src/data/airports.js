const airportData = [
  {
    country: "Austria",
    city: "Vienna",
    avioCompanies: ["Austrian Airlines", "easyJet Europe", "People's"],
  },
  {
    country: "Albania",
    city: "Tirana",
    avioCompanies: ["Alba Wings", "Air Albania"],
  },
  {
    country: "Belgium",
    city: "Bruxelles",
    avioCompanies: ["Brussels Airlines"],
  },
  {
    country: "Andorra",
    city: "Andorra",
    avioCompanies: ["Andorra Airlines"],
  },
  {
    country: "Armenia",
    city: "Yerevan",
    avioCompanies: ["Aircompany Armenia", "Armenia Airways"],
  },
  {
    country: "Azerbaijan",
    city: "Baku",
    avioCompanies: ["Buta Airways"],
  },
  {
    country: "Belarus",
    city: "Minsk",
    avioCompanies: ["Belavia"],
  },
  {
    country: "Bosnia & Herzegovina",
    city: "Sarajevo",
    avioCompanies: ["Icar Air"],
  },
  {
    country: "Bulgaria",
    city: "Sofia",
    avioCompanies: ["Bulgaria Air"],
  },
  {
    country: "Croatia",
    city: "Zagreb",
    avioCompanies: ["Croatin Airlines"],
  },
  {
    country: "Cyprus",
    city: "Nicosia",
    avioCompanies: ["Cyprus Airways", "Tus Airways"],
  },
  {
    country: "Czech Republic",
    city: "Prague",
    avioCompanies: ["Checz Airlines", "Smartwings"],
  },
  {
    country: "Denmark",
    city: "Copenhagen",
    avioCompanies: [
      "Alsie Express",
      "DAT",
      "Scandinavian Airlines",
      "Sun-Air of Scandinavia",
      "Nordic Seaplanes",
    ],
  },
  {
    country: "Estonia",
    city: "Tallinn",
    avioCompanies: ["FLYEST"],
  },
  {
    country: "Finland",
    city: "Helsinki",
    avioCompanies: ["Finnair", "Nordic Regional Airlines"],
  },
  {
    country: "France",
    city: "Paris",
    avioCompanies: [
      "Air Corsica",
      "Air France",
      "Air Guyane Express",
      "Chalair Aviation",
      "French Bee",
    ],
  },
  {
    country: "Georgia",
    city: "Tbilisi",
    avioCompanies: [
      "Georgian Airways",
      "MyWay Airlines",
      "Tbilisi Airways",
      "Vanilla Sky Airlines",
    ],
  },
  {
    country: "Germany",
    city: "Berlin",
    avioCompanies: ["Lufthansa", "City Airlines"],
  },
  {
    country: "Greece",
    city: "Athens",
    avioCompanies: ["Aegean Airlines"],
  },
  {
    country: "Hungary",
    city: "Budapest",
    avioCompanies: ["Wizz Air"],
  },
  {
    country: "Montenegro",
    city: "Podgorica",
    avioCompanies: ["Air Montenegro"],
  },
  {
    country: "Serbia",
    city: "Belgrade",
    avioCompanies: ["Air Serbia"],
  },
  {
    country: "Slovenia",
    city: "Ljubljana",
    avioCompanies: ["Aero4M", "Lipican Aer"],
  },
  {
    country: "United Kingdom",
    city: "London",
    avioCompanies: ["British Airways"],
  },
  {
    country: "Switzerland",
    city: "Bern",
    avioCompanies: ["EasyJet Switzerland"],
  },
];

export const cities = [];
export const avioCompaniesData = [];

airportData.map((item) => {
  cities.push({
    city: item.city,
    country: item.country,
  });
  return cities;
});

airportData.map((item) => {
  avioCompaniesData.push({
    avioCompany: item.avioCompanies,
    country: item.country,
  });
  return avioCompaniesData;
});

export const terminals = [
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
  "A6",
  "B1",
  "B2",
  "B3",
  "B4",
  "B5",
  "C1",
  "C2",
  "C3",
  "C4",
  "D1",
  "D2",
  "D3",
  "E1",
  "E2",
  "F1",
];

export const actions = [
  "Landed",
  "Took Off",
  "Expected",
  "Late",
  "In Time",
  "Cancelled",
];

export const time = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];
