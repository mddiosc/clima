import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ForecastData } from '../types';
import { 
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Zap,
  Droplets,
  Wind
} from "lucide-react";

interface ForecastProps {
  forecastData: ForecastData;
}

const Forecast = ({ forecastData }: ForecastProps): JSX.Element => {
  // Convert Kelvin to Celsius
  const kelvinToCelsius = (kelvin: number): number => {
    return Math.round(kelvin - 273.15);
  };

  // Get weather icon based on OpenWeatherMap icon code
  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      '01d': <Sun className="w-8 h-8 text-yellow-500" />,
      '01n': <Sun className="w-8 h-8 text-gray-400" />,
      '02d': <Cloud className="w-8 h-8 text-gray-500" />,
      '02n': <Cloud className="w-8 h-8 text-gray-600" />,
      '03d': <Cloud className="w-8 h-8 text-gray-500" />,
      '03n': <Cloud className="w-8 h-8 text-gray-600" />,
      '04d': <Cloud className="w-8 h-8 text-gray-600" />,
      '04n': <Cloud className="w-8 h-8 text-gray-700" />,
      '09d': <CloudRain className="w-8 h-8 text-blue-500" />,
      '09n': <CloudRain className="w-8 h-8 text-blue-600" />,
      '10d': <CloudRain className="w-8 h-8 text-blue-500" />,
      '10n': <CloudRain className="w-8 h-8 text-blue-600" />,
      '11d': <Zap className="w-8 h-8 text-purple-500" />,
      '11n': <Zap className="w-8 h-8 text-purple-600" />,
      '13d': <CloudSnow className="w-8 h-8 text-blue-200" />,
      '13n': <CloudSnow className="w-8 h-8 text-blue-300" />,
    };
    
    return iconMap[iconCode] || <Cloud className="w-8 h-8 text-gray-500" />;
  };

  // Group forecast by day (take first forecast for each day or closest to noon)
  const dailyForecast = forecastData.list
    .filter((item, index) => {
      // Take every 8th item (approximately daily) or find closest to noon
      const hour = new Date(item.dt * 1000).getHours();
      return index % 8 === 0 || hour === 12; // Every 8th entry OR noon forecast
    })
    .slice(0, 5); // Take 5 days

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">
        5-Day Forecast
      </h3>
      
      <motion.div 
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {dailyForecast.map((day, index) => (
          <motion.div
            key={day.dt}
            variants={itemVariants}
            className="flex items-center justify-between p-3 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="text-center min-w-[60px]">
                <p className="font-semibold text-gray-700 text-sm">
                  {index === 0 ? 'Today' : format(new Date(day.dt * 1000), 'EEE')}
                </p>
                <p className="text-xs text-gray-500">
                  {format(new Date(day.dt * 1000), 'MMM dd')}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {getWeatherIcon(day.weather[0].icon)}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-700">
                  {kelvinToCelsius(day.main.temp)}°
                </p>
                <p className="text-xs text-gray-500">
                  {kelvinToCelsius(day.main.temp_min)}°/{kelvinToCelsius(day.main.temp_max)}°
                </p>
              </div>
              
              <div className="flex flex-col space-y-1 text-xs text-gray-600">
                <div className="flex items-center space-x-1">
                  <Droplets className="w-3 h-3 text-blue-500" />
                  <span>{day.main.humidity}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Wind className="w-3 h-3 text-green-500" />
                  <span>{day.wind.speed.toFixed(1)} m/s</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Forecast;
