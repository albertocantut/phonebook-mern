import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI

app.listen(PORT, () => {
    console.log(`Server running at htpp://localhost:${PORT}`)
})