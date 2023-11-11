const assignRank = (value) => {
  let rank = "";
  if (value > 150000) {
    rank = "Top G";
  } else if (value > 100000) {
    rank = "Mr. Big Money";
  } else if (value > 50000) {
    rank = "Financially Independent";
  } else if (value > 25000) {
    rank = "Enterpreneur";
  } else if (value > 10000) {
    rank = "House Owner";
  } else if (value > 5000) {
    rank = "Finnacial Pillow";
  } else if (value > 2500) {
    rank = "Average Joe";
  } else if (value > 1000) {
    rank = "It's a start";
  } else if (value > 100) {
    rank = "Financially Dependent";
  } else {
    rank = "Broke";
  }
  return rank;
};

module.exports = assignRank;
