import { useState, useEffect } from 'react'
import axios from 'axios'

import CountryForm from './components/CountryForm'

const App = () => {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (country) {
      console.log('fetching country info...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
    }
  }, [country])

  return (
    <div>
      <CountryForm input={input} setInput={setInput} setCountry={setCountry} />
      {countries.map(country => (
        <div key={country.name.common}>{country.name.common}</div>
      ))}
    </div>
  )
}

export default App
