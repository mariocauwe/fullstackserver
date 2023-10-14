
//Shell: mongosh "mongodb+srv://cluster0.youqbtb.mongodb.net/myFirstDatabase" --apiVersion 1 --username openstack
const mongoose = require('mongoose')

console.log("command line parameters",process.argv.length)

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const dbUrl = `mongodb+srv://openstack:${password}@cluster0.youqbtb.mongodb.net/phonebook?retryWrites=true&w=majority`

const createPerson =  (name, number) => {
    const newPerson = new Person({name:name, number:number})
    newPerson.save().then(res => {
        console.log("Added",name,"number", number,"to phonebook");
        mongoose.connection.close()
    })
}

const getAllPersons = () => {
    Person.find({}).then(res => {
        console.log("phonebook:")
        res.forEach(person => {
            console.log(person.name, person.number);                
        })
        mongoose.connection.close() 
    })
}

mongoose.set('strictQuery',false)

mongoose.connect(dbUrl)
    .then(res => {
            console.log("connected to mongodb")     
        })
    .catch(err => {
            console.log("Failed to connect to mongodb",err)
            process.exit(1)     
        })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person',personSchema)

if (process.argv.length===5) {
    const name = process.argv[3]
    const number = process.argv[4]
    createPerson(name,number)
}
else {
    console.log("Listing all phonebook entries")
    getAllPersons()
}

