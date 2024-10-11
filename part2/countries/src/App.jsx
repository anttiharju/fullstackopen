import { useState, useEffect } from 'react'
import axios from 'axios'

import CountryForm from './components/CountryForm'
import CountryList from './components/CountryList'

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

      <CountryList countries={countries} />
    </div>
  )
}

export default App
