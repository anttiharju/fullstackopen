import Person from './Person'
import personService from '../services/persons'

const Persons = ({ persons, filter, setPersons }) => {
  const nameFilter = (person) => person.name.toLowerCase().includes(filter.toLowerCase())

  const personsToShow = filter === ''
    ? persons
    : persons.filter(nameFilter)

  const destroy = id => {
    personService
      .destroy(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  return (
    <ul>
      {personsToShow.map(person =>
        <Person
        key={person.id}
        name={person.name}
        number={person.number}
        destroy={() => destroy(person.id)}
        />
      )}
    </ul>
  )
}

export default Persons
