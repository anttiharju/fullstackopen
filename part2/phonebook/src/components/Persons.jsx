const Persons = ({ persons, filter }) => {
  const nameFilter = (person) => person.name.toLowerCase().includes(filter.toLowerCase())

  const personsToShow = filter === ''
    ? persons
    : persons.filter(nameFilter)

  return (
    <ul>
      {personsToShow.map(person =>
        <li key={person.name}>{person.name} {person.number}</li>
      )}
    </ul>
  )
}

export default Persons
