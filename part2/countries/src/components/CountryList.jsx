const CountryList = ({countries}) => {
  // if (countries.length > 10) {
  //   return (
  //     <p>
  //       Too many matches, specify another filter
  //     </p>
  //   )
  // }

  return (
    <>
      {countries.map(country => (
        <div key={country.name.common}>{country.name.common}</div>
      ))}
    </>
  )
}

export default CountryList
