import { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({persons, setPersons, setToast, setError}) => {
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

    const duplicate = persons.find((p) => p.name === newName)

    if (duplicate) {
      const sameNumber = duplicate.number === newNumber

      if (sameNumber) {
        alert(`${newName} is already added to phonebook`)
        return
      }

      if (!sameNumber) {
        if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
          const replacement = { ...duplicate, number: newNumber }
          personService
            .update(duplicate.id, replacement)
            .then(() => {
              setPersons(persons.map(p => p.id === duplicate.id ? replacement : p))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              setPersons(persons.filter(p => p.id !== duplicate.id))
              setError(
                `Information of ${duplicate.name} has already been removed from server`
              )
              setTimeout(() => {
                setError(null)
              }, 5000)
            })
        }
        return
      }
    }

    if (!newName) {
      setError('Name cannot be empty')
      setTimeout(() => {
        setError(null)
      }, 5000)
      return
    }

    if (!newNumber) {
      setError('Number cannot be empty')
      setTimeout(() => {
        setError(null)
      }, 5000)
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

    setToast(
      `Added ${newName}`
    )
    setTimeout(() => {
      setToast(null)
    }, 5000)
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
