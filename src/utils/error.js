const errors = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "The specified resource was not found.",
  405: "Method Not Allowed",
  406: "Invalid Data",
  409: "Conflict - Entity already exists",
  500: "Internal Server Error",
};

class ServerError extends Error {
  constructor(error, ...params) {
    super(...params);

    // Custom debugging information
    this.name = "ServerError";
    this.status = error.status || 500;
    this.message = error.message || this.getMessage(this.status);
    this.date = new Date();
  }

  getMessage(code) {
    return errors[code];
  }
}

module.exports = ServerError;
