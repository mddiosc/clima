import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import Error from "./Error";
import { FormProps } from "../types";
import { fadeInUp } from "../utils/animations";

const Form = ({ searchData, setSearchData, setQuery }: FormProps): React.JSX.Element => {
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
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
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
        <MapPin className={`w-5 h-5 ${isGettingLocation ? "animate-pulse" : ""}`} />
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
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
          placeholder="Enter city name"
        />
      </div>

      <div>
        <label htmlFor="country" className="block text-white text-sm font-medium mb-2">
          Country:
        </label>
        <div className="relative">
          <select
            name="country"
            id="country"
            value={country}
            onChange={handleSelectChange}
            className="w-full px-4 py-3 pr-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            <option value="" className="text-gray-800 bg-white">-- Select a country</option>
            <option value="US" className="text-gray-800 bg-white">United States</option>
            <option value="MX" className="text-gray-800 bg-white">Mexico</option>
            <option value="AR" className="text-gray-800 bg-white">Argentina</option>
            <option value="BR" className="text-gray-800 bg-white">Brazil</option>
            <option value="CA" className="text-gray-800 bg-white">Canada</option>
            <option value="CL" className="text-gray-800 bg-white">Chile</option>
            <option value="CO" className="text-gray-800 bg-white">Colombia</option>
            <option value="CR" className="text-gray-800 bg-white">Costa Rica</option>
            <option value="ES" className="text-gray-800 bg-white">Spain</option>
            <option value="FR" className="text-gray-800 bg-white">France</option>
            <option value="DE" className="text-gray-800 bg-white">Germany</option>
            <option value="IT" className="text-gray-800 bg-white">Italy</option>
            <option value="JP" className="text-gray-800 bg-white">Japan</option>
            <option value="KR" className="text-gray-800 bg-white">South Korea</option>
            <option value="PE" className="text-gray-800 bg-white">Peru</option>
            <option value="GB" className="text-gray-800 bg-white">United Kingdom</option>
            <option value="AU" className="text-gray-800 bg-white">Australia</option>
            <option value="IN" className="text-gray-800 bg-white">India</option>
            <option value="CN" className="text-gray-800 bg-white">China</option>
            <option value="RU" className="text-gray-800 bg-white">Russia</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
        </div>
      </div>

      <motion.button
        type="submit"
        className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        Search Weather
      </motion.button>
    </motion.form>
  );
};

export default Form;
