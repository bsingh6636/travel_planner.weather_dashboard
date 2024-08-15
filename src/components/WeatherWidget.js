
import { useContext} from "react";
import  "../css/weatherWidget.css"
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi'; 
import { myContext } from "..";
const WeatherWidget = () => {
    const {object} =useContext(myContext)
    const data = {
    "time": "2024-06-12T00:30:00Z",
    "values": {
        "temperatureAvg": 71.74,
        "weatherCodeMax": 1001,
    }
};

  return (
    
    <div className={`${object.marginTop}`}><WeeatherWidget data={data}/>
     </div>
  )
}

export default WeatherWidget

export const WeeatherWidget = ({ data }) => {
  const {
      time,
      values: {
          temperatureAvg,
          weatherCodeMax,
      }
  } = data;

  // Function to determine weather icon based on weatherCodeMax
  const getWeatherIcon = (code) => {
      switch (code) {
          case 1000:
              return <WiDaySunny size={50} />;
          case 1001:
              return <WiCloudy size={50} />;
          case 1100:
              return <WiDaySunny size={50} />;
          case 1101:
              return <WiCloudy size={50} />;
          case 2000:
              return <WiRain size={50} />;
          case 2100:
              return <WiSnow size={50} />;
          case 3000:
              return <WiThunderstorm size={50} />;
          default:
              return <WiDaySunny size={50} />;
      }
  };

  return (
      <div className="weather-widget h-40">
          <div className="weather-icon">
              {getWeatherIcon(weatherCodeMax)}
          </div>
          <div className="weather-info">
              <p className="temperature">{temperatureAvg}°F</p>
              <p className="date-time">{new Date(time).toLocaleString()}</p>
          </div>
      </div>
  );
};


