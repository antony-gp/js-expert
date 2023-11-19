exports.pickRandomIndex = (array) =>
  array?.length ? (Math.random() * array.length) | 0 : undefined;

const brlCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

exports.toBrlCurrency = (number) => {
  if (Number.isFinite(number)) return brlCurrencyFormatter.format(number);
};
