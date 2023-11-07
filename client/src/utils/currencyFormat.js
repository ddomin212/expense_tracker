const currencyFormat = (value, symbol, toEUR, toUSD) => {
  if (symbol === "USD") {
    value = value * toUSD;
  } else if (symbol === "EUR") {
    value = value * toEUR; //TODO: předělat na actual převodní kurz
  }
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: symbol,
    minimumFractionDigits: 0,
  });

  return formatter.format(value);
};
export default currencyFormat;
