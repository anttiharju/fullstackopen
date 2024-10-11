import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${apiKey}`
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
  }

  const temperature = 0
  const icon = '02n'
  const description = 'few clouds'
  const wind = 0

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <strong><p>languages:</p></strong>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <h2>Weather in {country.capital}</h2>
      <div>temperature {temperature} Celsius</div>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={`${country.capital} currently has ${description}`} />
      <div>wind {wind} m/s</div>
    </>
  )
}

export default Country
