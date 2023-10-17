const logger = require('../utils/logger')

const errorHandler = (err, request, response, next) => {
    logger.error('errorHandler',err.name,err.message)
    if (err.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if(err.name === 'ValidationError') {
        return response.status(400).json({ error: err.message })
    }
    next(err)
}

const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: 'unknown endpoint' })
}
module.exports = { errorHandler, unknownEndpoint }