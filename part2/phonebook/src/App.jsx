import { useState, useEffect } from 'react'
import personService from './services/persons'

import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [toast, setToast] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={toast} />

      <Filter filter={filter} setFilter={setFilter} />

      <h3>add a new</h3>

      <PersonForm persons={persons} setPersons={setPersons} setToast={setToast} />

      <h3>Numbers</h3>

      <Persons filter={filter} persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App
