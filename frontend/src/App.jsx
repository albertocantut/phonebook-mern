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
  const existingPerson = persons.find(
    (person) =>
      person.name.toLowerCase() ===
      newPerson.name.toLowerCase()
  )

  if (existingPerson) {
    const confirmed = window.confirm(
      `${existingPerson.name} is already in the phonebook. Replace the old number?`
    )

    if (!confirmed) {
      return false
    }

    try {
      const updatedPerson = await personService.update(
        existingPerson.id,
        {
          name: existingPerson.name,
          number: newPerson.number,
        }
      )

      setPersons((currentPersons) =>
        currentPersons.map((person) =>
          person.id === updatedPerson.id
            ? updatedPerson
            : person
        )
      )

      setErrorMessage('')
      return true
    } catch (error) {
      console.error(error)

      const message =
        error.response?.data?.error ||
        'Could not update the contact.'

      setErrorMessage(message)
      return false
    }
  }

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
      error.response?.data?.error ||
      'Could not create the contact.'

    setErrorMessage(message)
    return false
  }
}

  const deletePerson = async (id, name) => {
  const confirmed = window.confirm(
    `Delete ${name}?`
  )

  if (!confirmed) {
    return
  }

  try {
    await personService.remove(id)

    setPersons((currentPersons) =>
      currentPersons.filter(
        (person) => person.id !== id
      )
    )
  } catch (error) {
    console.error(error)

    const message =
      error.response?.data?.error ||
      'Could not delete the contact.'

    setErrorMessage(message)
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

            <button
              onClick={() =>
                deletePerson(person.id, person.name)
              }
            >
              Delete
            </button>
          </li>
          ))}
        </ul>
      )}
    </main>
  )
}


export default App