const mongoose = require('mongoose')

const numberValidatorMsg = "Phone number `{VALUE}` has an invalid format."
const numberValidator = (value) => {
    console.log("numberValidator",value)
    let regex = /^[0-9]{2,3}-[0-9]+$/gm
    return regex.test(value)
}

const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 3
    },
    number: {
        type: String,
        minLength: 8,
        validate: [numberValidator,numberValidatorMsg]
    } 
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person',personSchema)