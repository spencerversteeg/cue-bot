import HttpException from "./HttpException";

class MissingCodeException extends HttpException {
  constructor() {
    super(400, `Missing code. Please try again.`);
  }
}

export default MissingCodeException;
