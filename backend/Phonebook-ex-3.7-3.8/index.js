const express = require('express')
const app = express()
const morgan=require('morgan')
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(express.json())
let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]
  app.use(morgan("tiny"))
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  app.get('/info', (request, response) => {
    const total=persons.length
    response.send(`<p>Phonebook has information of ${total} persons <br/>${Date()}</p>`)
  })

  app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end() //shows status error
    //response.status(404).end('person not found') shows status err with msg
  }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })
  const generateId = () => {
    let maxId =Math.floor(Math.random() * 1000)
    const person = persons.find(person => person.id === maxId)
    if (person)
    {
      maxId =Math.floor(Math.random() * 1000)
    }
    return maxId
  }
  morgan.token('person', (request, response) => {
    return JSON.stringify(request.body)
  })
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    const newname = persons.find(person => person.name === body.name)
    if (!body.name||!body.number) {
      return response.status(400).json({ 
        error: 'Name aur Number missing' 
      })
    }
    if (newname) {
      return response.status(400).json({ 
        error: 'name must be unique'
      })
  }
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  app.use(unknownEndpoint)
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })