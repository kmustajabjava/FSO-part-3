import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAllContacts = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const createContact = PersonObject => {
    const request = axios.post(baseUrl, PersonObject)
    return request.then(response => response.data)
  }
  
  const updatecontact = (id, PersonObject) => {
    const request = axios.put(`${baseUrl}/${id}`, PersonObject)
    return request.then(response => response.data)
  }
const removecontact = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then((res) => res.data);
}
const datafunc = {
    getAllContacts,
    createContact,
    updatecontact,
    removecontact
}
  export default datafunc