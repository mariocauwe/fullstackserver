require('dotenv').config()
require('./middleware/databaseConnect')
require('./middleware/errorHandler')

const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(cors())
app.use(express.json())

morgan.token('reqbody', function (req, res) { return req.method==='POST'?JSON.stringify(req.body):null})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqbody'))

const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

  app.get('/api/persons', (request, response, next) => {
    console.log("Fetching all persons")
    Person.find({})
    .then(res => {
      console.log("all persons",res)
      response.json(res)
    })
    .catch( (error) => {
      console.log(error)
      next(error)
      //response.status(500).end()
    })
  })

  app.get('/api/persons/:id', (request, response,next) => {   
    Person.findById(request.params.id)
     .then(person => {
        if(person) {
          console.log("Person",person.id,"found")
          response.json(person)
        }
        else {
          console.log("Person not found")
          response.statusMessage="Person not found"
          response.status(404).end()
        }
     })
     .catch(error => {
        console.log(error)
        next(error)
        //response.status(400).send({ error: 'malformatted id' })
     })
  })

  app.delete('/api/persons/:id', (request, response,next) => {
    console.log("delete",request.params.id);
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.statusMessage="Person removed from phonebook"
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      next(error)
      //response.status(400).send({message: "Person not found"})
    })
  })

  app.post('/api/persons', (request, response, next) => {
    let newPerson = request.body
    console.log("post", newPerson, newPerson.name);

    if(!newPerson || !newPerson.name || !newPerson.number) {
      response.status(400).json({error: 'Name and/or Number are not specified'}).end()
    }
    Person.find({name: newPerson.name})
      .then(res => {
       if(res && res.length>0) {
         console.log("Person already exists", res)
         response.status(400).json(res[0])
       }
       else {
         console.log("Person not yet in phonebook")
         const person = new Person({
          name: newPerson.name,
          number: newPerson.number
        })
        person.save()
          .then(savedPerson => {
            response.json(savedPerson)
          })
          .catch( (error) => {
            console.log("catch person.save",error)
            next(error)
          })
       }
    })
    
  })

  app.put('/api/persons/:id', (request, response,next) => {
    console.log("update",request.params.id);
    let updatePerson = request.body
    console.log("put", updatePerson);

    Person.findByIdAndUpdate(request.params.id, updatePerson,{ runValidators: true })
    .then(result => {
      response.statusMessage="Person updated"
      response.status(204).end()
    })
    .catch(error => {
      console.log("catch person update",error)
      next(error)
      //response.status(400).send({message: "Person not found"})
    })
  })

  app.get('/info', (request, response, next) => {
    Person.countDocuments({})
    .then(result => {
      console.log(result)
      response.send(`There are ${result} entries in the phonebook on ${new Date()}`)
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
  })

  const errorHandler = (err, request, response, next) => {
    console.error("errorHandler1 error type",err.name)
    if (err.name === 'CastError') {
      return response.status(400).json({ content: 'malformatted id' })
    } else if(err.name === 'ValidationError') {
        let str =  err.message
        console.log("errorHandler2",str)
        return response.status(400).json({ content: str})
    }
    next(err)
  }
  // this has to be the last loaded middleware.
 app.use(errorHandler)
