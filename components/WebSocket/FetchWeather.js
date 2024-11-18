import weatherList from '../../weather.json' assert { type: "json" };
import {randomInteger} from "../../functions.js";

export const FetchWeather = message => {
  const weather = weatherList[randomInteger(0, weatherList.length-1)];
  return `
    ${message} ${weather.condition},
    температура ${weather.temperature}°,
    ветер ${weather.wind} м/с,
    влажность ${weather.humidity}%,
    давление ${weather.pressure} мм рт. ст.
  `;
}