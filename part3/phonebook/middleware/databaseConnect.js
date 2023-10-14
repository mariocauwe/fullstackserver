const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const dbUrl = process.env.MONGODB_URI

mongoose.connect(dbUrl)
  .then(result => {
    console.log('connected to MongoDB from DatabaseConnect')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })