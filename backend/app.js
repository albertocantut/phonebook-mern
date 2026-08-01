import cors from 'cors'
import express from 'express'

const app = express()

app.use(cors())
app.use(express.json())

let persons = [
    {
    id: '1',
    name: 'Ada Lovelace',
    number: '020 1234 5678',
    },
]

app.get('/', (_request, response) => {
    response.send('<h1>Phonebook API </h1>')
})

app.get('/api/persons', (_request, response) => {
    response.json(persons)
})

app.post('/api/persons', (request, response) => {
    const {name, number} = request.body

    if (!name || !number) {
        return response.status(400).json({
            error: 'Name and number are required'
        })
    }

    const nameAlreadyExists = persons.some(
        (person) => person.name.toLowerCase() === name.trim().toLowerCase()
    )
    if (nameAlreadyExists) {
        return response.status(400).json({
            error: 'A contact with this name already exists'
        })
    }

    const newPerson = {
        id: crypto.randomUUID(),
        name: name.trim(),
        number: number.trim(),
    }

    persons = [...persons, newPerson]
    return response.status(201).json(newPerson)
})

export default app