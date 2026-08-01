import cors from 'cors'
import express from 'express'
import personsRouter from './routes/personsRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (_request, response) => {
  response.send('<h1>Phonebook API</h1>')
})

app.use('/api/persons', personsRouter)

app.use((error, _request, response, _next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message,
    })
  }

  if (error.name === 'CastError') {
    return response.status(400).json({
      error: 'Invalid contact ID',
    })
  }

  return response.status(500).json({
    error: 'Internal server error',
  })
})

export default app