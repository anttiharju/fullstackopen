const Country = ({country}) => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${apiKey}`
  console.log('fetching weather info...')
  fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
      console.log('temperature:', data.main.temp)
      console.log('id:', data.weather[0].id)
      console.log('icon:', data.weather[0].icon)
      console.log('description:', data.weather[0].description)
      console.log('wind:', data.wind.speed)
    }
  )
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
