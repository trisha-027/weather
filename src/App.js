// import logo from './logo.svg';
// import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from 'react';
import './App.css';
import { WiCloudyGusts, WiHumidity } from "react-icons/wi";

const api = {
  key: "48fbc42d500269781f3e2ad755166925",
  base: "https://api.openweathermap.org/data/2.5/",
  weather_icon: "http://openweathermap.org/img/wn/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {

          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuild = (d) => {
    let months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    // let days = ["Sunday","Monday","Tuesday","Wednesday","Thrusday",
    // "Friday","Saturday"];

    // let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    // let year = d.getFullYear();

    return ` ${month} ${date} `
  }

  let time = new Date().toLocaleTimeString();
  const [ctime, setctime] = useState(time);

  const UpdateTime = () => {
    let time = new Date().toLocaleTimeString();
    setctime(time);
  };

  setInterval(UpdateTime, 1000);

  return (
    <div className={
      (typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app cold')
      : 'app'}>
      <main>

        <input
          type="text"
          className="search"
          placeholder="Type here"
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />

        {(typeof weather.main != 'undefined') ? (
          <div className="bg1">
            <div className="location_date">
              <div className="location">
                <h1>{weather.name}, {weather.sys.country}</h1>
              </div>
              <div className="date">
                <h1>{dateBuild(new Date())}, {ctime}</h1>
              </div>
            </div>

            <div className="info">
              <div className="feels">
                <strong>Feels like {Math.round(weather.main.feels_like)}<sup>o</sup>C</strong>
              </div>
              <div className="weather-box">
                <div className="temperature">
                  {Math.round(weather.main.temp)}<sup>o</sup><small>c</small>
                </div>

                <div className="weather">
                  {weather.weather[0].main}
                </div>
              </div>
            </div>

            <strong><hr /></strong>



            <div className="hum_wind">
              <div className="humidity">
               <div className="ic"><WiHumidity/> </div><small>{weather.main.humidity}%</small>
              </div>

              <div className="wind">

              <div className="ic">< WiCloudyGusts /> </div><small>{weather.wind.speed}kmph</small>
              </div>
            </div>


          </div>
        ) : ('')}















      </main>


    </div>
  );
}

export default App;
