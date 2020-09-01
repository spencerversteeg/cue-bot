import HttpException from "./HttpException";

class UserNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `User with the ID of ${id} was not found.`);
  }
}

export default UserNotFoundException;
