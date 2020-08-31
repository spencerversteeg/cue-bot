import { Request, Response, NextFunction } from "express";
import Guild from "../models/Guild";

// Will return all guilds from the databse.
export const get_all_guilds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const guilds = await Guild.find();

    if (guilds) return res.status(200).json(guilds);
  } catch (error) {
    return next(error);
  }
};

// Will return a single guild if there is an ID that matches the parameter provided.
export const get_guild = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const guild = await Guild.findById(req.params.guild_id);
    if (guild) return res.status(200).json(guild);

    return next({
      status: 404,
      message: `The guild with the ID of ${req.params.guild_id} does not exist.`,
    });
  } catch (error) {
    return next(error);
  }
};

// Writes a guild to the database with the provided information.
export const write_guild = async (guild_data) => {
  try {
    const guild = await Guild.create({
      _id: guild_data.guild_id,
      user: [guild_data.user_id],
      commands: [],
    });

    return guild;
  } catch (error) {
    return console.log(error);
  }
};

// Create a guild with a POST request.
export const create_guild = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const guild = await write_guild({
      _id: req.body.guild_id,
      user: req.body.user_Id,
      commands: [],
    });

    return res.status(200).json(guild);
  } catch (error) {
    return next(error);
  }
};

// Will delete a guild if the given paramter matches a user within the database.
export const delete_guild = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const guild = await Guild.findByIdAndDelete(req.params.guild_id);

    if (guild) return res.status(200).json(guild);

    return next({
      status: 404,
      message: `There was no guild found with the ID: ${req.params.guild_id}.`,
    });
  } catch (error) {
    return next(error);
  }
};
