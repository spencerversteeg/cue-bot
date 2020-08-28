import { Request, Response, NextFunction } from "express";
import Guild from "../models/Guild";

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

export const create_guild = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const guild = await Guild.create({
      _id: req.body.id,
      user: req.body.guilds,
      commands: [],
    });

    return res.status(200).json(guild);
  } catch (error) {
    return next(error);
  }
};

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
