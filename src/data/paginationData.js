var date = new Date();

const today = date.toISOString().split("T")[0];

date.setDate(date.getDate() - 1);

const yesterday = date.toISOString().split("T")[0];

const paginationData = [
  { href: `?day=${yesterday}`, date: yesterday, text: "Yesterday" },
  { href: `?day=${today}`, date: today, text: "Today" },
  { href: "?day=all", date: "all", text: "All Flights" },
];

export default paginationData;
