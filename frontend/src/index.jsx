import React, { useState } from "react";
import ReactDOM from "react-dom";

const baseURL = "http://localhost:9000/api";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const baseURL = "http://localhost:9000/api";

  const getWeatherFromApi = async city => {
    try {
      const response = await fetch(`${baseURL}/weather/${city}`);
      return response.json();
    } catch (error) {
      console.error(error);
    }

    return {};
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await getWeatherFromApi(city);

    setWeather(response);
    setCity("");
  };
  const weatherDiv = weather ? <div>{weather.description}</div> : <div />;

  return (
    <div>
      <div>
        <h2>Weather App</h2>
        <p>Type in the ciy of which weather you'd like to know</p>
      </div>
      <form onSubmit={e => handleSubmit(e)}>
        Give city:
        <input
          type="text"
          name="city"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button type="submit">search</button>
      </form>
      <div className="result">{weatherDiv}</div>
    </div>
  );
};

ReactDOM.render(<Weather />, document.getElementById("app"));
