import 'dotenv/config'
import mongoose from 'mongoose'
import app from './app.js'

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('MONGODB_URI is missing from the .env file')
  process.exit(1)
}

mongoose.set('strictQuery', false)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1)
  })