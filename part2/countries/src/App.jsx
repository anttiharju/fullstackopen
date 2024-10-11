import { useState, useEffect } from 'react'
import axios from 'axios'

import CountryForm from './components/CountryForm'
import CountryInfo from './components/CountryInfo'

const App = () => {
  const api_key = import.meta.env.VITE_OPEN_WEATHER
  console.log(api_key)
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (filter !== '') {
      console.log('fetching country info...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
    }
  }, [filter])

  return (
    <>
      <CountryForm filter={filter} setFilter={setFilter} />

      <CountryInfo countries={countries} filter={filter} setFilter={setFilter} />
    </>
  )
}

export default App
