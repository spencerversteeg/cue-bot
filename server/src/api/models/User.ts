import mongoose, { Schema, Document, mongo } from "mongoose";

export interface UserInterface extends Document {
  _id: String;
  email: String;
  username: String;
  profile_image_url: String;
  guilds: String[];
  discord_access_token: String;
  discord_refresh_token: String;
}

const UserSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserInterface>("User", UserSchema);

export default User;
