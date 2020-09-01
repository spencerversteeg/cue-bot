import bodyParser from "body-parser";
import express, { Application } from "express";
import mongoose from "mongoose";
import Controller from "./interfaces/controller.interface";
import error_middleware from "./middleware/error.middleware";
import logger_middleware from "./middleware/logger.middleware";

class App {
  public app: Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connect_database();
    this.initialize_middleware();
    this.initialize_controllers(controllers);
    this.initialize_error_handler();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`🚀 Cue Server is now listening on port ${process.env.PORT}`);
    });
  }

  private initialize_middleware() {
    this.app.use(logger_middleware);
    this.app.use(bodyParser.json());
  }

  private initialize_error_handler() {
    this.app.use(error_middleware);
  }

  private initialize_controllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private connect_database() {
    mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }
}

export default App;
