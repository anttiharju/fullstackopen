import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [info, setInfo] = useState({})
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (country) {
      console.log('fetching country info...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setInfo(response.data)
        })
    }
  }, [country])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(value)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        find countries <input value={value} onChange={handleChange} />
        <button type="submit">search</button>
      </form>
      <pre>
        {JSON.stringify(info, null, 2)}
      </pre>
    </div>
  )
}

export default App
