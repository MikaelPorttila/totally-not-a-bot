import type { Weather } from "./types/mod.ts";
import { configs } from "../configs.ts";

export const DEFAULT_WEATHER_AREAS = [
  "farsta",
  "sollentuna",
  "vallentuna",
  "solna",
  "bollmora",
  "vasastaden",
  "Kårböle",
  "högdalen",
];

const DEFAULT_COUNTRY = "se";

export async function getWeather(
  cityName: string,
  country = DEFAULT_COUNTRY,
): Promise<Weather> {
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${country}&appid=${configs.openWeatherApplicationId}&units=metric`;
  const response = await fetch(url);
  const result: Weather = await response.json();
  return result;
}

export async function getWeatherSummary(
  cities: string[],
  country = DEFAULT_COUNTRY,
): Promise<string> {
  const requests = cities.map((city) => getWeather(city, country));
  const weatherDataCollection = await Promise.all(requests);

  let result = "";
  for (const data of weatherDataCollection) {
    let name = data.name;
    if (name === "Bollmora") {
      name = '"Tyresö"';
    }

    let weatherSymbol;
    if (data.weather && data.weather[0]) {
      weatherSymbol = getWeatherSymbol(data.weather[0].main);
    }

    const temp = Math.round(data.main.temp);
    const feelsLikeTemp = Math.round(data.main.feels_like);
    result +=
      `**${name}**: ${temp} °C (Känns som: ${feelsLikeTemp} °C) ${weatherSymbol}\n`;
  }

  return result;
}

function getWeatherSymbol(description: string): string | undefined {
  switch (description.toLocaleLowerCase()) {
    case "clear":
      return "☀️";
    case "clouds":
      return "☁️";
    case "rain":
      return "🌧️";
    case "snow":
      return "🌨️";
    default:
      return undefined;
  }
}
