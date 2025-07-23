import { useState } from "react";
import Error from "./Error";
import { FormProps } from "../types";

const Form = ({ searchData, setSearchData, setQuery }: FormProps): JSX.Element => {
  const [hasError, setHasError] = useState<boolean>(false);

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
    <form onSubmit={handleSubmit} className="space-y-6">
      {hasError && <Error message="All fields are required" />}
      
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
          <option value="US" className="text-gray-800">United States</option>
          <option value="MX" className="text-gray-800">Mexico</option>
          <option value="AR" className="text-gray-800">Argentina</option>
          <option value="CO" className="text-gray-800">Colombia</option>
          <option value="CR" className="text-gray-800">Costa Rica</option>
          <option value="ES" className="text-gray-800">Spain</option>
          <option value="PE" className="text-gray-800">Peru</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-lg"
      >
        Search Weather
      </button>
    </form>
  );
};

export default Form;
