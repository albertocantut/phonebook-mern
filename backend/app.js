import cors from 'cors'
import express from 'express'
import Person from './models/person.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (_request, response) => {
  response.send('<h1>Phonebook API</h1>')
})

app.get('/api/persons', async (_request, response, next) => {
  try {
    const persons = await Person.find({})
    response.json(persons)
  } catch (error) {
    next(error)
  }
})

app.post('/api/persons', async (request, response, next) => {
  try {
    const { name, number } = request.body

    if (!name || !number) {
      return response.status(400).json({
        error: 'Name and number are required',
      })
    }

    const nameAlreadyExists = await Person.findOne({
      name: {
        $regex: `^${escapeRegExp(name.trim())}$`,
        $options: 'i',
      },
    })

    if (nameAlreadyExists) {
      return response.status(400).json({
        error: 'A contact with this name already exists',
      })
    }

    const person = new Person({
      name: name.trim(),
      number: number.trim(),
    })

    const savedPerson = await person.save()

    return response.status(201).json(savedPerson)
  } catch (error) {
    next(error)
  }
})

const escapeRegExp = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

app.use((error, _request, response, _next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message,
    })
  }

  return response.status(500).json({
    error: 'Internal server error',
  })
})

export default app