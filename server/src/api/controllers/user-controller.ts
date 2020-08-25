import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const get_all_users = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    if (users) return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

export const get_user = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = User.findById(req.params.user_id);
    if (user) return res.status(200).json(user);

    return next({
      status: 404,
      message: `The user with the ID of ${req.params.user_id} does not exist.`,
    });
  } catch (error) {
    return next(error);
  }
};

export const create_user = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.create({
      _id: req.body.id,
      email: req.body.email,
      username: req.body.username,
      profile_image_url: req.body.profile_image_url,
      guilds: req.body.guilds,
      discord_access_token: req.body.discord_access_token,
      discord_refresh_token: req.body.discord_refresh_token,
    });

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const delete_user = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = User.findByIdAndDelete(req.params.user_id);

    if (user) return res.status(200).json(user);

    return next({
      status: 404,
      message: `There was no user found with the ID: ${req.params.id}.`,
    });
  } catch (error) {
    return next(error);
  }
};
