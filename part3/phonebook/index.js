const express = require('express')
var morgan = require('morgan')

const app = express()
app.use(express.json())

morgan.token('reqbody', function (req, res) { return req.method==='POST'?JSON.stringify(req.body):null})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqbody'))


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

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
    },
    { 
      "id": 5,
      "name": "Mario", 
      "number": "233122"
    }
]


  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const person = persons.find(person => person.id=== Number(request.params.id) )
    if(person)
     response.json(person)
    else {
      response.statusMessage="Person not found"
      response.status(404).end()
    }
  })

  app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people</br> ${ new Date().toString()}`)
  })

  app.delete('/api/persons/:id', (request, response) => {
    persons = persons.filter(person => person.id !== Number(request.params.id) )
    console.log("delete",persons);
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    let newPerson = request.body
    console.log("post", newPerson);

    if(! newPerson || !newPerson.name || !newPerson.number) {
      response.status(400).json({error: 'Name and/or Number are not specified'})
      return
    }
    if(persons.findIndex(person => newPerson.name === person.name)!==-1) {
      response.status(400).json({error: 'Person already exists'})
      return
    }     
    newPerson.id = Math.round(Math.random()*1000)
    persons = persons.concat(newPerson)
    response.end()
  })
