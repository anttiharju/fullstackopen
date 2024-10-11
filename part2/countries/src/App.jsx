import { useState, useEffect } from 'react'
import axios from 'axios'

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

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(input)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        find countries <input value={input} onChange={handleChange} />
        <button type="submit">search</button>
      </form>
      {countries.map(country => (
        <div key={country.name.common}>{country.name.common}</div>
      ))}
    </div>
  )
}

export default App
