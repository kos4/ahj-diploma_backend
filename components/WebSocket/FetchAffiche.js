import afficheList from "../../affiche.json" with { type: "json" };
import {randomInteger} from "../../functions.js";

export const FetchAffiche = (message) => {
  const movie = afficheList.movie[randomInteger(0, afficheList.movie.length-1)];
  const concert = afficheList.concert[randomInteger(0, afficheList.concert.length-1)];
  const performance = afficheList.performance[randomInteger(0, afficheList.performance.length-1)];
  const exhibition = afficheList.exhibition[randomInteger(0, afficheList.exhibition.length-1)];

  message = `
    Кино: ${movie.tile.name} ${movie.tile.movieScheduleMeta.notice.places}.
    Концерт: ${concert.tile.name} ${concert.tile.concertScheduleMeta.notice.dates} в ${concert.tile.concertScheduleMeta.notice.place.name} ${concert.tile.concertScheduleMeta.notice.place.address}.
    Спектакль: ${performance.tile.name} ${performance.tile.performanceScheduleMeta.notice.dates} ${performance.tile.performanceScheduleMeta.notice.places}.
    Выставка: ${exhibition.tile.name} ${exhibition.tile.exbibitionScheduleMeta.notice.dates} в ${exhibition.tile.exbibitionScheduleMeta.notice.place.name} ${exhibition.tile.exbibitionScheduleMeta.notice.place.address}.
  `;

  if (afficheList) {
    return message;
  } else {
    return `${message} не найдена.`;
  }
};