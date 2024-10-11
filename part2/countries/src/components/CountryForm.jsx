const CountryForm = ({input, setInput, setCountry}) => {

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(input)
  }

  return (
    <form onSubmit={onSearch}>
      find countries <input value={input} onChange={handleChange} />
      <button type="submit">search</button>
    </form>
  )
}

export default CountryForm
