const CountryForm = ({filter, setFilter}) => {

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      find countries <input value={filter} onChange={handleChange} />
    </>
  )
}

export default CountryForm
