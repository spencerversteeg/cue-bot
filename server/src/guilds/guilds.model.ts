import { Schema, model, Document } from "mongoose";
import Guild from "./guilds.interface";

const guildSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  commands: [
    {
      type: Schema.Types.ObjectId,
      ref: "Command",
    },
  ],
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  // The user is an array, so other users can be added to the guild
  // So that other users can manage their Cue instance.
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const guildModel = model<Guild & Document>("Guild", guildSchema);

export default guildModel;
