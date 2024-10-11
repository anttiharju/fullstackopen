const CountryList = ({countries, filter}) => {
  const commonNameFilter = c => c.name.common.toLowerCase().includes(filter.toLowerCase())
  const filteredCountries = countries.filter(commonNameFilter)

  if (filteredCountries.length > 10) {
    return (
      <p>
        Too many matches, specify another filter
      </p>
    )
  }

  return (
    <>
      {filteredCountries.map(country => (
        <div key={country.name.common}>{country.name.common}</div>
      ))}
    </>
  )
}

export default CountryList
