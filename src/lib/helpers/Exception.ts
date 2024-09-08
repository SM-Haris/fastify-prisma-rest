class Exception extends Error {
    statusCode: number;
    errorMessage: string;
    isOperational: boolean;
  
    constructor(message: string, statusCode = 500, isOperational = true) {
      super();
      this.errorMessage = message;
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default Exception;
  