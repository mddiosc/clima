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
    <form onSubmit={handleSubmit}>
      {hasError && <Error message="All fields are required" />}
      
      <div className="input-field col s12">
        <input
          type="text"
          name="city"
          id="city"
          value={city}
          onChange={handleInputChange}
        />
        <label htmlFor="city">City: </label>
      </div>

      <div className="col s12" style={{marginBottom: '20px', background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: '5px'}}>
        <label htmlFor="country" style={{display: 'block', marginBottom: '10px', color: 'white', fontSize: '16px', fontWeight: 'bold'}}>Country:</label>
        <select 
          name="country" 
          id="country" 
          value={country} 
          onChange={handleSelectChange}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white',
            color: '#333',
            appearance: 'menulist',
            minHeight: '40px',
            display: 'block',
            position: 'relative',
            zIndex: 10
          }}
        >
          <option value="">-- Select a country</option>
          <option value="US">United States</option>
          <option value="MX">Mexico</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">Spain</option>
          <option value="PE">Peru</option>
        </select>
      </div>

      <div className="input-field col s12">
        <input
          type="submit"
          value="Search Weather"
          className="waves-effect waves-light btn btn-large btn-block yellow accent-4"
        />
      </div>
    </form>
  );
};

export default Form;
