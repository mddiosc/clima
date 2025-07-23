import { WeatherProps } from "../types";

const Weather = ({ weatherData }: WeatherProps): JSX.Element | null => {
  const { name, main } = weatherData;

  if (!name) return null;

  // Convert from Kelvin to Celsius
  const kelvinToCelsius = (kelvin: number): number => {
    return kelvin - 273.15;
  };

  const formatTemperature = (temp: number): string => {
    return kelvinToCelsius(temp).toFixed(2);
  };

  return (
    <div className="card-panel white col s12">
      <div className="black-text">
        <h2>Weather in {name}</h2>
        <p className="temperatura">
          {formatTemperature(main!.temp)} <span>&#x2103;</span>
        </p>
        <p>
          Max Temperature: {formatTemperature(main!.temp_max)}{" "}
          <span>&#x2103;</span>
        </p>
        <p>
          Min Temperature: {formatTemperature(main!.temp_min)}{" "}
          <span>&#x2103;</span>
        </p>
      </div>
    </div>
  );
};

export default Weather;
