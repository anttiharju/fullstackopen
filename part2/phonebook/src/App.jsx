import { useState } from 'react'

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const isDuplicateName = (x) => x.name === newName;
    if (contacts.some(isDuplicateName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const isDuplicateNumber = (x) => x.number === newNumber;
    if (contacts.some(isDuplicateNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    const contactObject = {
      name: newName,
      number: newNumber,
    }

    setContacts(contacts.concat(contactObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <div>name: <input value={newName} onChange={handleNameInput} /></div>
          <div>number: <input value={newNumber} onChange={handleNumberInput} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {contacts.map(note =>
          <li key={note.name}>{note.name} {note.number}</li>
        )}
    </div>
  )
}

export default App
