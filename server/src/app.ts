import "dotenv/config";
import cors from "cors";
import express, { Application } from "express";

// Import internal tools that make the app run.
import db from "./models";
import logger from "./middleware/logger.middleware";
import error from "./middleware/error.middleware";

const app: Application = express();

// Initialize DB
// This shouldn't be forced in production.
db.sync({ force: true });

// Middlewares
app.use(cors());
app.use(logger);

// TODO: Add Routes above error middleware.
app.use(error);

app.listen(process.env.PORT, () => {
  console.info(`🚀 Express server now running on port ${process.env.PORT}.`);
});
