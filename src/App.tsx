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
      return <div className="card-panel white col s12"><p>Loading...</p></div>;
    }
    
    if (hasError) {
      return <Error message="No results found or error occurred" />;
    }
    
    return <Weather weatherData={weatherData} />;
  };

  return (
    <>
      <Header title="Weather React App" />

      <div className="form-container">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form
                searchData={searchData}
                setSearchData={setSearchData}
                setQuery={setShouldQuery}
              />
            </div>
            <div className="col m6 s12">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
