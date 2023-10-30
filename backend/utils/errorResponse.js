// a custom calss to handle the error we receive
class ErrorResponse extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  module.exports = ErrorResponse;