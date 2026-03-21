import { motion } from "framer-motion";
import { format } from "date-fns";
import { ForecastData } from "../types";
import { Droplets, Wind } from "lucide-react";
import { roundTemperature, getWeatherIconUrl, getDailyForecast } from "../utils/weather";
import { staggerContainer, fadeInUp } from "../utils/animations";

interface ForecastProps {
  forecastData: ForecastData;
}

const Forecast = ({ forecastData }: ForecastProps): React.JSX.Element => {
  const dailyForecast = getDailyForecast(forecastData, 5);

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold text-white mb-6 text-center">
        5-Day Forecast
      </h3>

      <motion.div
        className="space-y-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {dailyForecast.map((day, index) => (
          <motion.div
            key={day.dt}
            variants={fadeInUp}
            className="card-glass-tile flex items-center justify-between p-3 hover:bg-white/15 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="text-center min-w-[60px]">
                <p className="font-semibold text-white text-sm">
                  {index === 0 ? "Today" : format(new Date(day.dt * 1000), "EEE")}
                </p>
                <p className="text-xs text-white/60">
                  {format(new Date(day.dt * 1000), "MMM dd")}
                </p>
              </div>

              <img
                src={getWeatherIconUrl(day.weather[0].icon)}
                alt={day.weather[0].description}
                className="w-10 h-10"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-lg font-bold text-white">
                  {roundTemperature(day.main.temp)}°
                </p>
                <p className="text-xs text-white/60">
                  {roundTemperature(day.main.temp_min)}°/{roundTemperature(day.main.temp_max)}°
                </p>
              </div>

              <div className="flex flex-col space-y-1 text-xs text-white/70">
                <div className="flex items-center space-x-1">
                  <Droplets className="w-3 h-3 text-blue-300" />
                  <span>{day.main.humidity}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Wind className="w-3 h-3 text-green-300" />
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
