import CountryList from './CountryList'

const CountryInfo = ({countries, filter}) => {
  const commonNameFilter = c => c.name.common.toLowerCase().includes(filter.toLowerCase())
  const filteredCountries = countries.filter(commonNameFilter)

  if (filteredCountries.length === 1) {
    return (
      <div>
        Info about one country
      </div>
    )
  }
  return (<CountryList countries={filteredCountries} />)
}

export default CountryInfo
