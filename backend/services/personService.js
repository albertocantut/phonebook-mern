import Person from '../models/person.js'

export const getAllPersons = async () => {
  return await Person.find({})
}

export const createPerson = async (personData) => {
  const person = new Person(personData)
  return await person.save()
}