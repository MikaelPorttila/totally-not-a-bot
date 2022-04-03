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
}
