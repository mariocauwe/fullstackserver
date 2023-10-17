const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })

})

blogsRouter.delete('/:id', (request, response, next) => {
    logger.info('Delete blog entry', request.params.id)
    Blog.findByIdAndDelete(request.params.id)
        .then(result => {
            console.log(result)
            response.send(`There are ${result} entries in the phonebook on ${new Date()}`)
        })
        .catch(error => {
            console.log(error)
            next(error)
        })
})
module.exports = blogsRouter