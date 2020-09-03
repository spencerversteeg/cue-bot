import { Schema, model, Document } from "mongoose";
import User from "./users.interface";

const userSchema = new Schema({
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
      type: Schema.Types.ObjectId,
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

const userModel = model<User & Document>("User", userSchema);

export default userModel;
