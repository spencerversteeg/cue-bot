import mongoose, { Schema, Document } from "mongoose";

export interface GuildInterface extends Document {
  _id: String;
  commands: String[];
  user: String[];
}

const GuildSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    commands: [
      {
        type: String,
        ref: "Command",
      },
    ],
    // The user is an array, so other users can be added to the guild
    // So that other users can manage their Cue instance.
    user: [
      {
        type: String,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Guild = mongoose.model<GuildInterface>("Guild", GuildSchema);

export default Guild;
