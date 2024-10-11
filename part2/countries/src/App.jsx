import { useState, useEffect } from 'react'
import axios from 'axios'

import CountryForm from './components/CountryForm'
import CountryList from './components/CountryList'

const App = () => {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (input !== '') {
      console.log('fetching country info...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
    }
  }, [input])

  return (
    <>
      <CountryForm input={input} setInput={setInput} />

      <CountryList countries={countries} />
    </>
  )
}

export default App
