import CountryList from './CountryList'

const CountryInfo = ({countries, filter}) => {
  const commonNameFilter = c => c.name.common.toLowerCase().includes(filter.toLowerCase())
  const filteredCountries = countries.filter(commonNameFilter)

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    return (
      <>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <strong><p>languages:</p></strong>
        <ul>
          {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </>
    )
  }
  return (<CountryList countries={filteredCountries} />)
}

export default CountryInfo
