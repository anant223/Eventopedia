class ApiError extends Error {
  constructor(message, status, code, errors=[]) {
    super(message)
    this.message = message,
    this.status = status,
    this.code = code,
    this.errors = errors
    this.name = "ApiError"
  }
  

}

export default ApiError;