import Person from './Person'

const Persons = ({ persons, filter }) => {
  const nameFilter = (person) => person.name.toLowerCase().includes(filter.toLowerCase())

  const personsToShow = filter === ''
    ? persons
    : persons.filter(nameFilter)

  return (
    <ul>
      {personsToShow.map(person =>
        <Person
        key={person.id}
        name={person.name}
        number={person.number}
        />
      )}
    </ul>
  )
}

export default Persons
