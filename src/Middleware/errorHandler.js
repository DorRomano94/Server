const ServerError = require('../utils/serverError')

const errorHandler = (err, req, res, next) => {
  if (err instanceof ServerError) {
    res.status(err.code)
    res.json({ error: err.message })
  }
}

module.exports =  errorHandler ;


