import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newPerson) => {
    const response = await axios.post(baseUrl, newPerson)
    return response.data
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}
export default {
    getAll,
    create,
    remove
}