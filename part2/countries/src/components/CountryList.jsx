const CountryList = ({countries, setFilter}) => {
  const onShow = (countryName) => {
    setFilter(countryName)
  }

  return (
    <>
      {countries.map(country => (
        <div key={country.name.common}>
          {country.name.common} <button onClick={() => onShow(country.name.common)}>show</button>
        </div>
      ))}
    </>
  )
}

export default CountryList
