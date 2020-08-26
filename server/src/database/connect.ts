import mongoose, { connection } from "mongoose";

export default (db: string) => {
  const connect = () => {
    mongoose
      .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return console.log("✅ Successfully connected to MongoDB.");
      })
      .catch((err) => {
        console.log("❌ Error connecting the MongoDB:", err);
        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on("disconnected", connect);
};
