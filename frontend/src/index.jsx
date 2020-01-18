import React, { useState } from "react";
import ReactDOM from "react-dom";

const baseURL = "http://localhost:9000/api";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const baseURL = "http://localhost:9000/api";

  const getWeatherFromApi = async city => {
    if (city) {
      try {
        console.log("hello");
        const response = await fetch(`${baseURL}/weather/${city}`);
        return response.json();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch(`${baseURL}/weather`);
        return response.json();
      } catch (error) {
        console.error(error);
      }
    }

    return {};
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const weather = await getWeatherFromApi(city);
    setWeather(weather);
    setCity(null);
  };
  const weatherDiv = weather ? <div /> : <div />;

  return (
    <div>
      <div>
        <h2>Weather app</h2>
        <p>Type in the ciy of which weather you'd like to know</p>
      </div>
      <form onSubmit={e => handleSubmit(e)}>
        Give city:
        <input
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button type="submit">search</button>
      </form>
      <div className="result">{weatherDiv}</div>
    </div>
  );
};

/* class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: ""
    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApi();
    this.setState({ icon: weather.icon.slice(0, -1) });
  }

  render() {
    const { icon } = this.state;

    return (
      <div className="icon">{icon && <img src={`/img/${icon}.svg`} />}</div>
    );
  }
} */

ReactDOM.render(<Weather />, document.getElementById("app"));
