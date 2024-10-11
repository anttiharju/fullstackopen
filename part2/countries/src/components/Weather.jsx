import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
  const [weather, setWeather] = useState(null)

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric`
  useEffect(() => {
    const key = import.meta.env.VITE_OPEN_WEATHER
    if (key) {
      axios
        .get(`${weatherUrl}&appid=${key}`)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => {
          console.log('Failed to fetch weather data:', error)
        })
    } else {
      console.error('OpenWeather API key has not been provided - see README.md')
    }
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
