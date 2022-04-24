import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [location, setLocation] = useState(false)
  const [weather, setWeather] = useState(false)

  let getWeather = async (lat, long) =>{
    let res = await axios.get('https://api.openweathermap.org/data/2.5/weather',{
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

  if (location == false) {
    return (
      <>
        Você precisa habilitar a localização no browser o/
      </>)
  } else if (weather == false){
    return (
      <>
        Carregando o clima
      </>)
  } else {
    return (
      <>
        <h3>Clima na sua localidade ({weather['weather'][0]['description']})</h3>
        <hr />
        <div>
          <p>Temperatura atual: {weather['main']['temp']}°</p>
          <p>Temperatura maxima: {weather['main']['temp_max']}°</p>
          <p>Temperatura minima: {weather['main']['temp_min']}°</p>
          <p>Pressão: {weather['main']['pressure']} hPa</p>
          <p>Humidade do ar: {weather['main']['humidity']}%</p>
        </div>
      </>
    );

  }


}

export default App;
