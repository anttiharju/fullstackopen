const CountryList = ({countries}) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  return (
    <>
      {countries.map(country => (
        <div key={country.name.common}>{country.name.common}</div>
      ))}
    </>
  )
}

export default CountryList
