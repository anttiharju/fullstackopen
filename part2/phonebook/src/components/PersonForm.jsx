import { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('')
  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const [newNumber, setNewNumber] = useState('')
  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const isDuplicateName = (x) => x.name === newName;
    if (persons.some(isDuplicateName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const isDuplicateNumber = (x) => x.number === newNumber;
    if (persons.some(isDuplicateNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        <div>name: <input value={newName} onChange={handleNameInput} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberInput} /></div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
