import React from "react";
import ReactDOM from "react-dom";

const baseURL = "http://localhost:9000/api";

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
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
      <div>
        <div>
          <div className="icon">{icon && <img src={`/img/${icon}.svg`} />}</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Weather />, document.getElementById("app"));
