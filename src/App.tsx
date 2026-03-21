import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Error from "./components/Error";
import { SearchData, WeatherData, ForecastData } from "./types";
import { getWeatherGradient } from "./utils/weather";
import { fadeInUp } from "./utils/animations";

function App(): React.JSX.Element {
  const [searchData, setSearchData] = useState<SearchData>({
    city: "",
    country: "",
  });

  const [shouldQuery, setShouldQuery] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const [forecastData, setForecastData] = useState<ForecastData | undefined>(undefined);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { city, country } = searchData;

  // Dynamic gradient based on current weather condition
  const weatherCondition = weatherData.weather?.[0]?.main;
  const gradient = getWeatherGradient(weatherCondition);

  useEffect(() => {
    const fetchWeatherData = async (): Promise<void> => {
      if (shouldQuery && city && country) {
        setIsLoading(true);
        setHasError(false);

        try {
          const apiKey = import.meta.env.VITE_API_KEY_WEATHER;

          if (!apiKey) {
            console.error("API key not found");
            setHasError(true);
            setIsLoading(false);
            setShouldQuery(false);
            return;
          }

          const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
          const currentResponse = await fetch(currentWeatherUrl);
          const currentResult: WeatherData = await currentResponse.json();

          const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${apiKey}`;
          const forecastResponse = await fetch(forecastUrl);
          const forecastResult: ForecastData = await forecastResponse.json();

          if (currentResult.cod === "404" || currentResult.cod === 404) {
            setHasError(true);
            setWeatherData({});
            setForecastData(undefined);
          } else {
            setHasError(false);
            setWeatherData(currentResult);
            if (
              forecastResponse.ok &&
              forecastResult.list &&
              forecastResult.list.length > 0 &&
              (forecastResult.cod === "200" || forecastResult.cod === 200 || !forecastResult.cod)
            ) {
              setForecastData(forecastResult);
            } else {
              setForecastData(undefined);
            }
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setHasError(true);
          setWeatherData({});
          setForecastData(undefined);
        } finally {
          setIsLoading(false);
          setShouldQuery(false);
        }
      }
    };

    fetchWeatherData();
  }, [city, country, shouldQuery]);

  const contentKey = isLoading ? "loading" : hasError ? "error" : weatherData.name ? "weather" : "empty";

  const renderContent = (): React.JSX.Element | null => {
    if (isLoading) {
      return (
        <motion.div
          key="loading"
          className="card-glass w-full p-6"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/70"></div>
            <p className="ml-3 text-white/80">Loading...</p>
          </div>
        </motion.div>
      );
    }

    if (hasError) {
      return (
        <motion.div
          key="error"
          className="w-full"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
        >
          <Error message="No results found or error occurred" />
        </motion.div>
      );
    }

    return (
      <motion.div
        key="weather"
        className="w-full"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
      >
        <Weather weatherData={weatherData} forecastData={forecastData} />
      </motion.div>
    );
  };

  return (
    <motion.div
      className={`min-h-screen bg-gradient-to-br ${gradient} transition-all duration-1000`}
      animate={{ backgroundImage: undefined }}
    >
      <Header title="Weather App" />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Sidebar — search form */}
          <div className="xl:col-span-3 card-glass-strong p-6">
            <Form
              searchData={searchData}
              setSearchData={setSearchData}
              setQuery={setShouldQuery}
            />
          </div>

          {/* Main content */}
          <div className="xl:col-span-9 flex items-start">
            <AnimatePresence mode="wait" key={contentKey}>
              {renderContent()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default App;
