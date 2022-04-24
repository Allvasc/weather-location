import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { WiBarometer, WiHumidity, WiDirectionUp, WiDirectionDown, WiThermometer } from "react-icons/wi";
import loading from './loading.gif'

function App() {

  const [location, setLocation] = useState(false)
  const [weather, setWeather] = useState(false)

  let getWeather = async (lat, long) => {
    let res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  if (location === false) {
    return (
      <>
        <p>Você precisa habilitar a localização no browser o/</p>
      </>)
  } else if (weather === false) {
    return (
      <>
        <img className='load' src={loading} alt="loading" />
      </>)
  } else {
    return (
      <>
        <div className='case'>
          <h3>Clima na sua localidade <br /> ({weather['weather'][0]['description']})</h3>
          <hr />
          <div>
            <p><WiThermometer className='sizeIcon' />Temperatura atual: {weather['main']['temp']}°</p>
            <p><WiDirectionUp className='sizeIcon' />Temperatura maxima: {weather['main']['temp_max']}°</p>
            <p><WiDirectionDown className='sizeIcon' />Temperatura minima: {weather['main']['temp_min']}°</p>
            <p><WiBarometer className='sizeIcon' /> Pressão atm: {weather['main']['pressure']} hPa</p>
            <p><WiHumidity className='sizeIcon' />Humidade do ar: {weather['main']['humidity']}%</p>
          </div>
        </div>
      </>
    );

  }

}

export default App;
