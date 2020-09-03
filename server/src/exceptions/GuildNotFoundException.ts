import HttpException from "./HttpException";

class GuildNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Guild with the ID of ${id} was not found.`);
  }
}

export default GuildNotFoundException;
