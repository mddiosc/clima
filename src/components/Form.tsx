import { useState } from "react";
import { motion } from "framer-motion";
import Error from "./Error";
import { FormProps } from "../types";
import { MapPin } from "lucide-react";

const Form = ({ searchData, setSearchData, setQuery }: FormProps): JSX.Element => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isGettingLocation, setIsGettingLocation] = useState<boolean>(false);

  const { city, country } = searchData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSearchData({
      ...searchData,
      country: e.target.value,
    });
  };

  const getCurrentLocation = (): void => {
    setIsGettingLocation(true);
    setHasError(false);

    if (!navigator.geolocation) {
      setHasError(true);
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Use reverse geocoding to get city and country
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${import.meta.env.VITE_API_KEY_WEATHER}`
          );
          
          if (response.ok) {
            const locationData = await response.json();
            if (locationData.length > 0) {
              const location = locationData[0];
              setSearchData({
                city: location.name,
                country: location.country,
              });
            }
          }
        } catch (error) {
          console.error("Error getting location:", error);
          setHasError(true);
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setHasError(true);
        setIsGettingLocation(false);
      }
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    // Validate form data
    if (city.trim() === "" || country.trim() === "") {
      setHasError(true);
      return;
    }

    setHasError(false);
    setQuery(true);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {hasError && <Error message="All fields are required" />}
      
      {/* Geolocation button */}
      <motion.button
        type="button"
        onClick={getCurrentLocation}
        disabled={isGettingLocation}
        className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 border border-white/30 disabled:opacity-50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <MapPin className={`w-5 h-5 ${isGettingLocation ? 'animate-pulse' : ''}`} />
        <span>{isGettingLocation ? "Getting location..." : "Use my location"}</span>
      </motion.button>
      
      <div>
        <label htmlFor="city" className="block text-white text-sm font-medium mb-2">
          City:
        </label>
        <input
          type="text"
          name="city"
          id="city"
          value={city}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
          placeholder="Enter city name"
        />
      </div>

      <div>
        <label htmlFor="country" className="block text-white text-sm font-medium mb-2">
          Country:
        </label>
        <select 
          name="country" 
          id="country" 
          value={country} 
          onChange={handleSelectChange}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all appearance-none cursor-pointer"
        >
          <option value="" className="text-gray-800">-- Select a country</option>
          <option value="US" className="text-gray-800">🇺🇸 United States</option>
          <option value="MX" className="text-gray-800">🇲🇽 Mexico</option>
          <option value="AR" className="text-gray-800">🇦🇷 Argentina</option>
          <option value="BR" className="text-gray-800">🇧🇷 Brazil</option>
          <option value="CA" className="text-gray-800">🇨🇦 Canada</option>
          <option value="CL" className="text-gray-800">🇨🇱 Chile</option>
          <option value="CO" className="text-gray-800">🇨🇴 Colombia</option>
          <option value="CR" className="text-gray-800">🇨🇷 Costa Rica</option>
          <option value="ES" className="text-gray-800">🇪🇸 Spain</option>
          <option value="FR" className="text-gray-800">🇫🇷 France</option>
          <option value="DE" className="text-gray-800">🇩🇪 Germany</option>
          <option value="IT" className="text-gray-800">🇮🇹 Italy</option>
          <option value="JP" className="text-gray-800">🇯🇵 Japan</option>
          <option value="KR" className="text-gray-800">🇰🇷 South Korea</option>
          <option value="PE" className="text-gray-800">🇵🇪 Peru</option>
          <option value="GB" className="text-gray-800">🇬🇧 United Kingdom</option>
          <option value="AU" className="text-gray-800">🇦🇺 Australia</option>
          <option value="IN" className="text-gray-800">🇮🇳 India</option>
          <option value="CN" className="text-gray-800">🇨🇳 China</option>
          <option value="RU" className="text-gray-800">🇷🇺 Russia</option>
        </select>
      </div>

      <motion.button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Search Weather
      </motion.button>
    </motion.form>
  );
};

export default Form;
