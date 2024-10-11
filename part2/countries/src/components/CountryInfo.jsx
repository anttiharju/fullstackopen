import CountryList from './CountryList'

const CountryInfo = ({countries, filter}) => {
  return (<CountryList countries={countries} filter={filter} />)
}

export default CountryInfo
