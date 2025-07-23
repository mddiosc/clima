export interface SearchData {
  city: string;
  country: string;
}

export interface WeatherData {
  name?: string;
  main?: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
    pressure: number;
    feels_like?: number;
    sea_level?: number;
    grnd_level?: number;
  };
  weather?: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind?: {
    speed: number;
    deg?: number;
    gust?: number;
  };
  visibility?: number;
  clouds?: {
    all: number;
  };
  sys?: {
    sunrise: number;
    sunset: number;
  };
  timezone?: number;
  cod?: string | number;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
      humidity: number;
      pressure: number;
      feels_like: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
    visibility: number;
    pop: number; // probability of precipitation
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
    timezone: number;
  };
  cod?: string | number;
  message?: string;
}

export interface FormProps {
  searchData: SearchData;
  setSearchData: (searchData: SearchData) => void;
  setQuery: (query: boolean) => void;
}

export interface WeatherProps {
  weatherData: WeatherData;
  forecastData?: ForecastData;
}

export interface ErrorProps {
  message: string;
}

export interface HeaderProps {
  title: string;
}
