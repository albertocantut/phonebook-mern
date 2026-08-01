import cors from 'cors'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import personsRouter from './routes/personsRoutes.js'
import morgan from 'morgan'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors())
app.use(express.json())
morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

app.use(
  morgan(
    ':method :url :status :response-time ms :body'
  )
)

app.use('/api/persons', personsRouter)

const frontendDistPath = path.join(__dirname, '../frontend/dist')

app.use(express.static(frontendDistPath))

app.use((error, _request, response, _next) => {
  console.error(error)

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

  if (error.code === 11000) {
    return response.status(400).json({
      error: 'A contact with this name already exists',
    })
  }

  return response.status(500).json({
    error: 'Internal server error',
  })
})

export default app