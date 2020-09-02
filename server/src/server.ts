import "dotenv/config";
import App from "./app";
import validateENV from "./utils/validateENV";
import UserController from "./users/users.controller";

validateENV();

const app = new App([new UserController()]);

app.listen();
