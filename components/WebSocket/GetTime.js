import timeZone from "../../timeZone.json" assert { type: "json" };
import moment from "moment-timezone";
export const GetTime = city => {
  const cityData = timeZone.filter(i => i.name === city)[0];

  if (cityData) {
    return `Сейчас в ${city} ${moment().tz(cityData.zone).locale('ru').format('LLLL')}`;
  } else {
    return `Города "${city}" нет в базе.`;
  }
};