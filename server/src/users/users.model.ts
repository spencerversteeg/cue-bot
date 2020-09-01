import { Schema, model, Document } from "mongoose";
import User from "./users.interface";

const user_schema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  profile_image_url: {
    type: String,
  },
  guilds: [
    {
      type: String,
      ref: "Guild",
    },
  ],
  discord_access_token: {
    type: String,
  },
  discord_refresh_token: {
    type: String,
  },
});

const user_model = model<User & Document>("User", user_schema);

export default user_model;
