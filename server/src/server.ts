import "dotenv/config";
import App from "./app";
import validate_env from "./utils/validate_env";
import UserController from "./users/users.controller";

validate_env();

const app = new App([new UserController()]);

app.listen();
