import { useState, useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Error from "./components/Error";
import { SearchData, WeatherData } from "./types";

function App(): JSX.Element {
  const [searchData, setSearchData] = useState<SearchData>({
    city: "",
    country: "",
  });

  const [shouldQuery, setShouldQuery] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { city, country } = searchData;

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

          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

          const response = await fetch(url);
          const result: WeatherData = await response.json();
          
          if (result.cod === "404" || result.cod === 404) {
            setHasError(true);
            setWeatherData({});
          } else {
            setHasError(false);
            setWeatherData(result);
          }
          
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setHasError(true);
          setWeatherData({});
        } finally {
          setIsLoading(false);
          setShouldQuery(false);
        }
      }
    };
    
    fetchWeatherData();
  }, [city, country, shouldQuery]);

  const renderContent = (): JSX.Element => {
    if (isLoading) {
      return (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
            <p className="ml-3 text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }
    
    if (hasError) {
      return <Error message="No results found or error occurred" />;
    }
    
    return <Weather weatherData={weatherData} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600">
      <Header title="Weather React App" />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/20">
            <Form
              searchData={searchData}
              setSearchData={setSearchData}
              setQuery={setShouldQuery}
            />
          </div>
          <div className="flex items-start">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
