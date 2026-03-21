import { WeatherProps } from "../types";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Thermometer,
  Droplets,
  Wind,
  Gauge,
  ArrowUp,
  ArrowDown,
  Cloud,
  Eye,
  Sunrise,
  Sunset,
} from "lucide-react";
import TemperatureChart from "./TemperatureChart";
import Forecast from "./Forecast";
import {
  formatTemperature,
  getWeatherIconUrl,
  getWindDirection,
} from "../utils/weather";
import { staggerContainerFull, fadeInUp } from "../utils/animations";

const Weather = ({ weatherData, forecastData }: WeatherProps): React.JSX.Element | null => {
  const { name, main, weather, wind, visibility, clouds, sys } = weatherData;

  if (!name) return null;

  const formatVisibility = (vis: number): string => (vis / 1000).toFixed(1);

  const formatTime = (timestamp: number): string =>
    format(new Date(timestamp * 1000), "HH:mm");

  const currentWeather = weather?.[0];
  const weatherDescription = currentWeather?.description ?? "";
  const weatherIcon = currentWeather?.icon ?? "01d";

  return (
    <div className="w-full">
      {/* Main weather card */}
      <motion.div
        className="card-glass p-6 mb-6"
        variants={staggerContainerFull}
        initial="hidden"
        animate="visible"
      >
        {/* City name + icon + description */}
        <motion.div className="text-center mb-6" variants={fadeInUp}>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Weather in {name}
          </h2>
          <div className="flex justify-center mb-1">
            <img
              src={getWeatherIconUrl(weatherIcon)}
              alt={weatherDescription}
              className="w-20 h-20 drop-shadow-lg"
            />
          </div>
          <p className="text-lg text-white/80 capitalize font-medium">
            {weatherDescription}
          </p>
        </motion.div>

        {/* Main temperature */}
        <motion.div className="text-center mb-6" variants={fadeInUp}>
          <div className="text-6xl font-light text-white">
            {formatTemperature(main!.temp)}
            <span className="text-2xl align-top text-white/70">°C</span>
          </div>
        </motion.div>

        {/* Temperature range */}
        <motion.div className="grid grid-cols-2 gap-3 mb-6" variants={fadeInUp}>
          <div className="card-glass-tile p-3 flex items-center justify-center">
            <ArrowUp className="w-5 h-5 text-red-300 mr-2" />
            <div className="text-center">
              <p className="text-xs text-white/60 font-medium">Max</p>
              <p className="text-base font-semibold text-white">
                {formatTemperature(main!.temp_max)}°C
              </p>
            </div>
          </div>
          <div className="card-glass-tile p-3 flex items-center justify-center">
            <ArrowDown className="w-5 h-5 text-blue-300 mr-2" />
            <div className="text-center">
              <p className="text-xs text-white/60 font-medium">Min</p>
              <p className="text-base font-semibold text-white">
                {formatTemperature(main!.temp_min)}°C
              </p>
            </div>
          </div>
        </motion.div>

        {/* Details grid */}
        <motion.div className="grid grid-cols-2 gap-3" variants={fadeInUp}>
          <div className="card-glass-tile p-4 flex items-center">
            <Droplets className="w-6 h-6 text-blue-300 mr-3 shrink-0" />
            <div>
              <p className="text-xs text-white/60 font-medium">Humidity</p>
              <p className="text-base font-semibold text-white">{main!.humidity}%</p>
            </div>
          </div>

          <div className="card-glass-tile p-4 flex items-center">
            <Wind className="w-6 h-6 text-green-300 mr-3 shrink-0" />
            <div>
              <p className="text-xs text-white/60 font-medium">Wind</p>
              <p className="text-base font-semibold text-white">
                {wind?.speed ?? 0} m/s{wind?.deg !== undefined ? ` ${getWindDirection(wind.deg)}` : ""}
              </p>
            </div>
          </div>

          <div className="card-glass-tile p-4 flex items-center">
            <Gauge className="w-6 h-6 text-purple-300 mr-3 shrink-0" />
            <div>
              <p className="text-xs text-white/60 font-medium">Pressure</p>
              <p className="text-base font-semibold text-white">{main!.pressure} hPa</p>
            </div>
          </div>

          <div className="card-glass-tile p-4 flex items-center">
            <Thermometer className="w-6 h-6 text-orange-300 mr-3 shrink-0" />
            <div>
              <p className="text-xs text-white/60 font-medium">Feels like</p>
              <p className="text-base font-semibold text-white">
                {formatTemperature(main?.feels_like ?? main!.temp)}°C
              </p>
            </div>
          </div>

          {visibility !== undefined && (
            <div className="card-glass-tile p-4 flex items-center">
              <Eye className="w-6 h-6 text-indigo-300 mr-3 shrink-0" />
              <div>
                <p className="text-xs text-white/60 font-medium">Visibility</p>
                <p className="text-base font-semibold text-white">
                  {formatVisibility(visibility)} km
                </p>
              </div>
            </div>
          )}

          {clouds !== undefined && (
            <div className="card-glass-tile p-4 flex items-center">
              <Cloud className="w-6 h-6 text-gray-300 mr-3 shrink-0" />
              <div>
                <p className="text-xs text-white/60 font-medium">Cloudiness</p>
                <p className="text-base font-semibold text-white">{clouds.all}%</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Sunrise / Sunset */}
        {sys?.sunrise !== undefined && sys?.sunset !== undefined && (
          <motion.div className="grid grid-cols-2 gap-3 mt-4" variants={fadeInUp}>
            <div className="card-glass-tile p-4 flex items-center">
              <Sunrise className="w-6 h-6 text-yellow-300 mr-3 shrink-0" />
              <div>
                <p className="text-xs text-white/60 font-medium">Sunrise</p>
                <p className="text-base font-semibold text-white">{formatTime(sys.sunrise)}</p>
              </div>
            </div>

            <div className="card-glass-tile p-4 flex items-center">
              <Sunset className="w-6 h-6 text-orange-300 mr-3 shrink-0" />
              <div>
                <p className="text-xs text-white/60 font-medium">Sunset</p>
                <p className="text-base font-semibold text-white">{formatTime(sys.sunset)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Charts and Forecast */}
      {forecastData && (
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
          <motion.div
            className="card-glass"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <TemperatureChart forecastData={forecastData} />
          </motion.div>

          <motion.div
            className="card-glass"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <Forecast forecastData={forecastData} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Weather;
