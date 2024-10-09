import { useState } from 'react'

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filter, setFilter] = useState('')
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

  const handleFilterInput = (event) => {
    // console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const nameFilter = (contact) => contact.name.toLowerCase().includes(filter.toLowerCase())

  const contactsToShow = filter === ''
    ? contacts
    : contacts.filter(nameFilter)

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filter} onChange={handleFilterInput} />
      <h2>add a new</h2>
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
        {contactsToShow.map(note =>
          <li key={note.name}>{note.name} {note.number}</li>
        )}
    </div>
  )
}

export default App
