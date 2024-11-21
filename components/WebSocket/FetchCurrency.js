import currencyList from "../../currency.json" with { type: "json" };

export const FetchCurrency = (currency) => {
  const currencyData = currencyList.filter(i => i.CharCode === currency)[0];

  if (currencyData) {
    return `Курс ${currencyData.Name} ${currencyData.Value} ₽`;
  } else {
    return `Валюты с кодом "${currency}" не найдено.`;
  }
};