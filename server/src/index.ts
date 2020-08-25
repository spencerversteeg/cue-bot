import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response, NextFunction } from "express";
import chalk from "chalk";
import bodyParser from "body-parser";

import errorHandler from "./api/middlewares/error";
import connect from "./database/connect";

// App Variables.
const app: Application = express();
const port: number = 8081;
const db: string = process.env.MONGO_URI;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(errorHandler);

// Connect to database.
connect(db);

// Routes
import user_routes from "./api/routes/user-routes";
app.use("/api/user", user_routes);

// Start express server.
app.listen(port, (err) => {
  if (err) return console.log(err);

  return console.log(
    chalk.green(`🚀 The server is now listening on port ${port}.`)
  );
});
