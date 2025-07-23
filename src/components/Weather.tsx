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
    <div className="bg-white rounded-lg shadow-lg p-6 text-gray-800">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
        Weather in {name}
      </h2>
      
      <div className="text-center mb-4">
        <div className="text-6xl font-light text-sky-600 mb-2">
          {formatTemperature(main!.temp)}
          <span className="text-2xl align-top">°C</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3 text-center">
        <div className="bg-sky-50 rounded-lg p-3">
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Max:</span> {formatTemperature(main!.temp_max)}°C
          </p>
        </div>
        <div className="bg-sky-50 rounded-lg p-3">
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Min:</span> {formatTemperature(main!.temp_min)}°C
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
