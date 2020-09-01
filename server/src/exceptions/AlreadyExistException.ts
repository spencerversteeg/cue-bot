import HttpException from "./HttpException";

class AlreadyExistException extends HttpException {
  constructor(id: string) {
    super(400, `An entity with the ID of ${id} already exist.`);
  }
}

export default AlreadyExistException;
