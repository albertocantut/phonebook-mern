import Person from '../models/person.js'

const escapeRegExp = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const getPersons = async (_request, response, next) => {
  try {
    const persons = await Person.find({})
    response.json(persons)
  } catch (error) {
    next(error)
  }
}

export const createPerson = async (request, response, next) => {
  try {
    const { name, number } = request.body

    if (!name || !number) {
      return response.status(400).json({
        error: 'Name and number are required',
      })
    }

    const cleanedName = name.trim()
    const cleanedNumber = number.trim()

    const nameAlreadyExists = await Person.findOne({
      name: {
        $regex: `^${escapeRegExp(cleanedName)}$`,
        $options: 'i',
      },
    })

    if (nameAlreadyExists) {
      return response.status(400).json({
        error: 'A contact with this name already exists',
      })
    }

    const person = new Person({
      name: cleanedName,
      number: cleanedNumber,
    })

    const savedPerson = await person.save()

    return response.status(201).json(savedPerson)
  } catch (error) {
    next(error)
  }
}

export const deletePerson = async (request, response, next) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(request.params.id)

    if (!deletedPerson) {
      return response.status(404).json({
        error: 'Contact not found',
      })
    }

    return response.status(204).end()
  } catch (error) {
    next(error)
  }
}

export const updatePerson = async (request, response, next) => {
    try {
        const { name, number } = request.body
        
        if (!name || !number) {
            return response.status(400).json({
                error: 'name and number are required'
            })
        }

        const updatedPerson = await Person.findByIdAndUpdate(
            request.params.id,
            {
                name: name.trim(),
                number: number.trim(),
            },
            {
                returnDocument: 'after',
                runValidators: true,
                context: 'query',
            }
            )
        if (!updatedPerson) {
            return response.status(404).json({
                error: 'Contact not found',
            })
            }

        return response.json(updatedPerson)
        } catch (error) {
        next(error)
    }
}