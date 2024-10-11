import { useState, useEffect } from 'react'
import axios from 'axios'

import Search from './components/Search'
import Results from './components/Results'

const App = () => {
  const [filter, setFilter] = useState('Finland')
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
      <Search filter={filter} setFilter={setFilter} />

      <Results filter={filter} setFilter={setFilter} countries={countries} />
    </>
  )
}

export default App
