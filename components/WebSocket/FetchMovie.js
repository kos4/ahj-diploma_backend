import movieList from "../../movie.json" with { type: "json" };
import {randomInteger} from "../../functions.js";

export const FetchMovie = (message) => {
  const movie = movieList[randomInteger(0, movieList.length-1)];

  message += ` ${movie.title} ${movie.year} https://en.wikipedia.org/wiki/${movie.href}`;

  if (movie) {
    return message;
  } else {
    return `${message} не найден.`;
  }
};