import express from 'express'
import {
  getPersons,
  createPerson,
  deletePerson,
} from '../controllers/personsController.js'

const personsRouter = express.Router()

personsRouter.get('/', getPersons)
personsRouter.post('/', createPerson)
personsRouter.delete('/:id', deletePerson)

export default personsRouter