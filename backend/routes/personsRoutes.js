import express from 'express'
import {
  getPersons,
  createPerson,
  deletePerson,
  updatePerson,
} from '../controllers/personsController.js'

const personsRouter = express.Router()

personsRouter.get('/', getPersons)
personsRouter.post('/', createPerson)
personsRouter.put('/:id', updatePerson)
personsRouter.delete('/:id', deletePerson)


export default personsRouter