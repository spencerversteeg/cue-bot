import "dotenv/config";
import App from "./app";
import validateENV from "./utils/validateENV";
import UserController from "./users/users.controller";
import AuthenticationController from "./authentication/authentication.controller";
import GuildController from "./guilds/guilds.controller";

validateENV();

const app = new App([
  new UserController(),
  new AuthenticationController(),
  new GuildController(),
]);

app.listen();
