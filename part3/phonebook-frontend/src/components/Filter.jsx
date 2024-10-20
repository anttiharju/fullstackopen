const Persons = ({ filter, setFilter }) => {
  const handleFilterInput = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      filter shown with <input value={filter} onChange={handleFilterInput} />
    </>
  )
}

export default Persons
