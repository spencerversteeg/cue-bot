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

    this.connectDatabase();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandler();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`🚀 Cue Server is now listening on port ${process.env.PORT}`);
    });
  }

  private initializeMiddleware() {
    this.app.use(logger_middleware);
    this.app.use(bodyParser.json());
  }

  private initializeErrorHandler() {
    this.app.use(error_middleware);
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/api/", controller.router);
    });
  }

  private connectDatabase() {
    mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }
}

export default App;
