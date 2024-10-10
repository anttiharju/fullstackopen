import Person from './Person'
import personService from '../services/persons'

const Persons = ({ persons, filter, setPersons }) => {
  const nameFilter = (person) => person.name.toLowerCase().includes(filter.toLowerCase())

  const personsToShow = filter === ''
    ? persons
    : persons.filter(nameFilter)

  const destroy = id => {
    if (window.confirm("Do you really want to delete this person?")) {
      personService
      .destroy(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        const person = persons.find(p => p.id === id)
        alert(
          `the person '${person.name}' with number '${person.number}' was already deleted from server.`
        )
        setPersons(persons.filter(p => p.id !== id))
      })
    }
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
