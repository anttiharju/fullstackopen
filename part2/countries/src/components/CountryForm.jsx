const CountryForm = ({input, setInput}) => {

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  return (
    <>
      find countries <input value={input} onChange={handleChange} />
    </>
  )
}

export default CountryForm
