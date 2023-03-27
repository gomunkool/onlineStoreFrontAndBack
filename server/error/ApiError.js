class ApeError extends Error{
constructor (status, message) {
  super()
  this.status = status
  this.message = message
}
static badRequest(message){
  return new ApeError (404, message)
}

static internal(message){
  return new ApeError (500, message)
}

static forbidden(message){
  return new ApeError (403, message)
}

}

module.exports = ApeError