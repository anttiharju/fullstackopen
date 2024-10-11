import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
  const key = import.meta.env.VITE_OPEN_WEATHER
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${key}`
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    console.log('fetching weather data')
    axios
      .get(weatherUrl)
      .then(response => {
        setWeather(response.data)
      })
  }, [weatherUrl])

  if (weather){
    console.log('temperature:', weather.main.temp)
    console.log('id:', weather.weather[0].id)
    console.log('icon:', weather.weather[0].icon)
    console.log('description:', weather.weather[0].description)
    console.log('wind:', weather.wind.speed)

    const temperature = 0
    const icon = '02n'
    const description = 'few clouds'
    const wind = 0

    return (
      <>
        <h2>Weather in {capital}</h2>
        <div>temperature {temperature} Celsius</div>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={`${capital} currently has ${description}`} />
        <div>wind {wind} m/s</div>
      </>
    )
  }
  return (<></>)
}

export default Weather
