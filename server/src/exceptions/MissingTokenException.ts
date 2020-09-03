import HttpException from "./HttpException";

class MissingTokenException extends HttpException {
  constructor() {
    super(401, `Unauthorized.`);
  }
}

export default MissingTokenException;
