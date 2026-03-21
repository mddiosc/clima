// Kelvin to Celsius conversion
export const kelvinToCelsius = (kelvin: number): number => {
  return kelvin - 273.15;
};

export const formatTemperature = (kelvin: number, decimals = 1): string => {
  return kelvinToCelsius(kelvin).toFixed(decimals);
};

export const roundTemperature = (kelvin: number): number => {
  return Math.round(kelvinToCelsius(kelvin));
};

// OWM weather icon image URL
export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

// Wind direction from degrees
export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

// Dynamic background gradient based on current weather condition
export type WeatherCondition =
  | 'Clear'
  | 'Clouds'
  | 'Rain'
  | 'Drizzle'
  | 'Thunderstorm'
  | 'Snow'
  | 'Mist'
  | 'Smoke'
  | 'Haze'
  | 'Dust'
  | 'Fog'
  | 'Sand'
  | 'Ash'
  | 'Squall'
  | 'Tornado';

const WEATHER_THEMES: Record<string, string> = {
  Clear: 'from-amber-400 via-orange-400 to-yellow-500',
  Clouds: 'from-slate-400 via-slate-500 to-gray-600',
  Rain: 'from-blue-600 via-slate-600 to-slate-700',
  Drizzle: 'from-blue-600 via-slate-600 to-slate-700',
  Thunderstorm: 'from-purple-800 via-slate-800 to-gray-900',
  Snow: 'from-blue-100 via-slate-200 to-gray-300',
  Mist: 'from-gray-400 via-slate-400 to-gray-500',
  Smoke: 'from-gray-400 via-slate-400 to-gray-500',
  Haze: 'from-gray-400 via-slate-400 to-gray-500',
  Dust: 'from-yellow-600 via-amber-600 to-orange-700',
  Fog: 'from-gray-400 via-slate-400 to-gray-500',
  Sand: 'from-yellow-600 via-amber-600 to-orange-700',
  Ash: 'from-gray-500 via-gray-600 to-gray-700',
  Squall: 'from-blue-600 via-slate-600 to-slate-700',
  Tornado: 'from-purple-800 via-slate-800 to-gray-900',
};

export const getWeatherGradient = (condition?: string): string => {
  if (!condition) return 'from-sky-400 via-sky-500 to-sky-600';
  return WEATHER_THEMES[condition] ?? 'from-sky-400 via-sky-500 to-sky-600';
};

// Get unique daily forecasts — one entry per calendar day, preferring noon
import type { ForecastData } from '../types';

export interface DailyForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  weather: Array<{ main: string; description: string; icon: string }>;
  wind: { speed: number; deg: number };
  visibility: number;
  pop: number;
  dt_txt: string;
}

export const getDailyForecast = (forecastData: ForecastData, days = 5): DailyForecastItem[] => {
  const seen = new Set<string>();
  const result: DailyForecastItem[] = [];

  // Build a map of date -> all entries for that date
  const byDate = new Map<string, typeof forecastData.list>();
  for (const item of forecastData.list) {
    const date = item.dt_txt.slice(0, 10); // 'YYYY-MM-DD'
    if (!byDate.has(date)) byDate.set(date, []);
    byDate.get(date)!.push(item);
  }

  for (const [date, entries] of byDate) {
    if (seen.has(date)) continue;
    seen.add(date);

    // Prefer noon entry, fallback to first
    const noon = entries.find((e) => e.dt_txt.includes('12:00:00'));
    result.push((noon ?? entries[0]) as DailyForecastItem);

    if (result.length >= days) break;
  }

  return result;
};
