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
  };
  weather?: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind?: {
    speed: number;
  };
  cod?: string | number;
}

export interface FormProps {
  searchData: SearchData;
  setSearchData: (searchData: SearchData) => void;
  setQuery: (query: boolean) => void;
}

export interface WeatherProps {
  weatherData: WeatherData;
}

export interface ErrorProps {
  message: string;
}

export interface HeaderProps {
  title: string;
}
