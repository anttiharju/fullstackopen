import Country from './Country'
import CountryList from './CountryList'

const Results = ({filter, setFilter, countries}) => {
  const matchingNames = c => c.name.common.toLowerCase().includes(filter.toLowerCase())
  const filteredCountries = countries.filter(matchingNames)

  if (filteredCountries.length === 1) {
    return (<Country country={filteredCountries[0]} />)
  }

  if (filteredCountries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  }

  return (<CountryList countries={filteredCountries} setFilter={setFilter} />)
}

export default Results
