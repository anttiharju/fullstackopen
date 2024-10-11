import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
  const [weather, setWeather] = useState(null)

  const key = import.meta.env.VITE_OPEN_WEATHER
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${key}`
  useEffect(() => {
    axios
      .get(weatherUrl)
      .then(response => {
        setWeather(response.data)
      })
  }, [weatherUrl])

  if (!weather) {
    return (<></>)
  }

  const temp = weather.main.temp
  const icon = weather.weather[0].icon
  const desc = weather.weather[0].description
  const wind = weather.wind.speed
  return (
    <>
      <h2>Weather in {capital}</h2>
      <div>temperature {temp} Celsius</div>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={`${capital} has ${desc}`} />
      <div>wind {wind} m/s</div>
    </>
  )
}

export default Weather
