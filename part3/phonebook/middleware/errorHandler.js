const errorHandler = (err, request, response, next) => {
  console.error("errorHandler",err.message)
  console.log("errorHandler",err.name)
  if (err.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(err.name === 'ValidationError') {
      return response.status(400).json({ error: err.message })
  }
  next(err)
}
  
module.exports = errorHandler;