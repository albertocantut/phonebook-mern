import { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm.jsx'
import personService from './services/persons.js'
import './App.css'

function App() {
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadPersons = async () => {
      try {
        const data = await personService.getAll()
        setPersons(data)
      } catch (error) {
        console.error(error)
        setErrorMessage('Could not load the phonebook.')
      }
    }

    loadPersons()
  }, [])

  const createPerson = async (newPerson) => {
    try {
      const savedPerson = await personService.create(newPerson)

      setPersons((currentPersons) => [
        ...currentPersons,
        savedPerson,
      ])

      setErrorMessage('')
      return true
    } catch (error) {
      console.error(error)

      const message =
        error.response?.data?.error || 'Could not create the contact.'

      setErrorMessage(message)
      return false
    }
  }

  return (
    <main>
      <h1>Phonebook</h1>

      {errorMessage && <p role="alert">{errorMessage}</p>}

      <ContactForm onCreate={createPerson} />

      <h2>Contacts</h2>

      {persons.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul>
          {persons.map((person) => (
            <li key={person.id}>
              {person.name}: {person.number}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App