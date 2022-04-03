import type { Config } from "../types/mod.ts";
import type { Weather } from "./types/mod.ts";

export class WeatherService {
  constructor(private config: Config) {}

  async get(cityName: string, country: string = "se"): Promise<Weather> {
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${country}&appid=${this.config.openWeatherApplicationId}&units=metric`;
    const response = await fetch(url);
    const result: Weather = await response.json();
    return result;
  }

  async getSummary(cities: string[], country = "se"): Promise<string> {
    const requests = cities.map((city) => this.get(city, country));
    const weatherDataCollection = await Promise.all(requests);

    let result = "";
    for (const data of weatherDataCollection) {
      let name = data.name;
      if (name === "Bollmora") {
        name = '"Tyresö"';
      }

      let weatherSymbol;
      if (data.weather && data.weather[0]) {
        weatherSymbol = this.getWeatherSymbol(data.weather[0].main);
      }

      const temp = Math.round(data.main.temp);
      const feelsLikeTemp = Math.round(data.main.feels_like);
      result +=
        `**${name}**: ${temp} °C (Känns som: ${feelsLikeTemp} °C) ${weatherSymbol}\n`;
    }

    return result;
  }

  private getWeatherSymbol(description: string): string | undefined {
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
}

export const DEFAULT_WEATHER_AREAS = [
  "farsta",
  "sollentuna",
  "vallentuna",
  "solna",
  "bollmora",
  "vasastaden"
];
