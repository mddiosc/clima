import { WeatherProps } from "../types";
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Gauge, 
  ArrowUp, 
  ArrowDown,
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Zap,
  Eye,
  Sunrise,
  Sunset
} from "lucide-react";
import TemperatureChart from "./TemperatureChart";
import Forecast from "./Forecast";

const Weather = ({ weatherData, forecastData }: WeatherProps): JSX.Element | null => {
  const { name, main, weather, wind, visibility, clouds, sys } = weatherData;

  if (!name) return null;

  // Convert from Kelvin to Celsius
  const kelvinToCelsius = (kelvin: number): number => {
    return kelvin - 273.15;
  };

  const formatTemperature = (temp: number): string => {
    return kelvinToCelsius(temp).toFixed(1);
  };

  // Convert visibility from meters to kilometers
  const formatVisibility = (vis: number): string => {
    return (vis / 1000).toFixed(1);
  };

  // Convert wind direction
  const getWindDirection = (degrees: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  // Format sunrise/sunset times
  const formatTime = (timestamp: number): string => {
    return format(new Date(timestamp * 1000), 'HH:mm');
  };

  // Get weather icon based on OpenWeatherMap icon code
  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      '01d': <Sun className="w-16 h-16 text-yellow-500" />, // clear sky day
      '01n': <Sun className="w-16 h-16 text-gray-400" />, // clear sky night
      '02d': <Cloud className="w-16 h-16 text-gray-500" />, // few clouds day
      '02n': <Cloud className="w-16 h-16 text-gray-600" />, // few clouds night
      '03d': <Cloud className="w-16 h-16 text-gray-500" />, // scattered clouds
      '03n': <Cloud className="w-16 h-16 text-gray-600" />, 
      '04d': <Cloud className="w-16 h-16 text-gray-600" />, // broken clouds
      '04n': <Cloud className="w-16 h-16 text-gray-700" />,
      '09d': <CloudRain className="w-16 h-16 text-blue-500" />, // shower rain
      '09n': <CloudRain className="w-16 h-16 text-blue-600" />,
      '10d': <CloudRain className="w-16 h-16 text-blue-500" />, // rain
      '10n': <CloudRain className="w-16 h-16 text-blue-600" />,
      '11d': <Zap className="w-16 h-16 text-purple-500" />, // thunderstorm
      '11n': <Zap className="w-16 h-16 text-purple-600" />,
      '13d': <CloudSnow className="w-16 h-16 text-blue-200" />, // snow
      '13n': <CloudSnow className="w-16 h-16 text-blue-300" />,
    };
    
    return iconMap[iconCode] || <Cloud className="w-16 h-16 text-gray-500" />;
  };

  const currentWeather = weather?.[0];
  const weatherDescription = currentWeather?.description || "";
  const weatherIcon = currentWeather?.icon || "01d";

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="w-full">
      {/* Main weather card */}
      <motion.div 
        className="bg-white rounded-lg shadow-lg p-6 text-gray-800 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with city name and weather icon */}
        <motion.div className="text-center mb-6" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Weather in {name}
          </h2>
          <div className="flex justify-center mb-2">
            {getWeatherIcon(weatherIcon)}
          </div>
          <p className="text-lg text-gray-600 capitalize font-medium">
            {weatherDescription}
          </p>
        </motion.div>
        
        {/* Main temperature */}
        <motion.div className="text-center mb-6" variants={itemVariants}>
          <div className="text-6xl font-light text-sky-600 mb-2">
            {formatTemperature(main!.temp)}
            <span className="text-2xl align-top">°C</span>
          </div>
        </motion.div>
        
        {/* Temperature range */}
        <motion.div className="grid grid-cols-2 gap-3 mb-6" variants={itemVariants}>
          <div className="bg-red-50 rounded-lg p-3 flex items-center justify-center">
            <ArrowUp className="w-5 h-5 text-red-500 mr-2" />
            <div className="text-center">
              <p className="text-sm text-gray-500 font-medium">Max</p>
              <p className="text-lg font-semibold text-red-600">
                {formatTemperature(main!.temp_max)}°C
              </p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-center">
            <ArrowDown className="w-5 h-5 text-blue-500 mr-2" />
            <div className="text-center">
              <p className="text-sm text-gray-500 font-medium">Min</p>
              <p className="text-lg font-semibold text-blue-600">
                {formatTemperature(main!.temp_min)}°C
              </p>
            </div>
          </div>
        </motion.div>

        {/* Additional weather info - Grid layout */}
        <motion.div className="grid grid-cols-2 gap-3" variants={itemVariants}>
          <div className="bg-sky-50 rounded-lg p-4 flex items-center">
            <Droplets className="w-6 h-6 text-blue-500 mr-3" />
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium">Humidity</p>
              <p className="text-lg font-semibold text-gray-700">{main!.humidity}%</p>
            </div>
          </div>
          
          <div className="bg-sky-50 rounded-lg p-4 flex items-center">
            <Wind className="w-6 h-6 text-green-500 mr-3" />
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium">Wind</p>
              <p className="text-lg font-semibold text-gray-700">
                {wind?.speed || 0} m/s {wind?.deg && getWindDirection(wind.deg)}
              </p>
            </div>
          </div>
          
          <div className="bg-sky-50 rounded-lg p-4 flex items-center">
            <Gauge className="w-6 h-6 text-purple-500 mr-3" />
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium">Pressure</p>
              <p className="text-lg font-semibold text-gray-700">{main!.pressure} hPa</p>
            </div>
          </div>
          
          <div className="bg-sky-50 rounded-lg p-4 flex items-center">
            <Thermometer className="w-6 h-6 text-orange-500 mr-3" />
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium">Feels like</p>
              <p className="text-lg font-semibold text-gray-700">
                {main?.feels_like ? formatTemperature(main.feels_like) : formatTemperature(main!.temp)}°C
              </p>
            </div>
          </div>

          {visibility && (
            <div className="bg-sky-50 rounded-lg p-4 flex items-center">
              <Eye className="w-6 h-6 text-indigo-500 mr-3" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Visibility</p>
                <p className="text-lg font-semibold text-gray-700">{formatVisibility(visibility)} km</p>
              </div>
            </div>
          )}

          {clouds && (
            <div className="bg-sky-50 rounded-lg p-4 flex items-center">
              <Cloud className="w-6 h-6 text-gray-500 mr-3" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Cloudiness</p>
                <p className="text-lg font-semibold text-gray-700">{clouds.all}%</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Sunrise/Sunset */}
        {sys?.sunrise && sys?.sunset && (
          <motion.div className="grid grid-cols-2 gap-3 mt-4" variants={itemVariants}>
            <div className="bg-yellow-50 rounded-lg p-4 flex items-center">
              <Sunrise className="w-6 h-6 text-yellow-500 mr-3" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Sunrise</p>
                <p className="text-lg font-semibold text-gray-700">{formatTime(sys.sunrise)}</p>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4 flex items-center">
              <Sunset className="w-6 h-6 text-orange-500 mr-3" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">Sunset</p>
                <p className="text-lg font-semibold text-gray-700">{formatTime(sys.sunset)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Charts and Forecast Section - Desktop Layout */}
      {forecastData && (
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
          {/* Temperature Chart */}
          <motion.div
            className="bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <TemperatureChart forecastData={forecastData} />
          </motion.div>

          {/* 5-day Forecast */}
          <motion.div
            className="bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Forecast forecastData={forecastData} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Weather;
