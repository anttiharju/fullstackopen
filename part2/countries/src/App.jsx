import { useState, useEffect } from 'react'
import axios from 'axios'

import CountryForm from './components/CountryForm'
import CountryList from './components/CountryList'

const App = () => {
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

      <CountryList countries={countries} filter={filter} />
    </>
  )
}

export default App
