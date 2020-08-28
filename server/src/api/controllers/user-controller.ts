import { Request, Response, NextFunction } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
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
    const user = await User.findById(req.params.user_id);
    if (user) return res.status(200).json(user);

    return next({
      status: 404,
      message: `The user with the ID of ${req.params.user_id} does not exist.`,
    });
  } catch (error) {
    return next(error);
  }
};

export const write_user = async (user_data) => {
  try {
    const user = await User.create({
      _id: user_data.id,
      email: user_data.email,
      username: user_data.username,
      profile_image_url: user_data.profile_image_url,
      guilds: user_data.guilds,
      discord_access_token: user_data.discord_access_token,
      discord_refresh_token: user_data.discord_refresh_token,
    });

    return user;
  } catch (error) {
    return console.log(error);
  }
};

export const register_user = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.code)
      return next({ status: 422, message: "No code was provided." });

    const code = req.body.code;
    const client_id = process.env.DISCORD_CLIENT_ID;
    const client_secret = process.env.DISCORD_CLIENT_SECRET;

    const auth_request_url = "https://discordapp.com/api/oauth2/token";
    const auth_request_body = `client_id=${client_id}&client_secret=${client_secret}&code=${code}&grant_type=authorization_code&redirect_uri=http://localhost:8080/`;
    const auth_request_config = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    const authorizeUserWithDiscord = await axios.post(
      auth_request_url,
      auth_request_body,
      auth_request_config
    );
    const discordAuthenticationInformation = authorizeUserWithDiscord.data;

    const user_request_url = "https://discordapp.com/api/users/@me";
    const user_request_config = {
      headers: {
        Authorization: `Bearer ${discordAuthenticationInformation.access_token}`,
      },
    };

    const getDiscordUserInformation = await axios.get(
      user_request_url,
      user_request_config
    );

    const discordUserInformation = getDiscordUserInformation.data;

    const newUser = await write_user({
      id: discordUserInformation.id,
      username: `${discordUserInformation.username}#${discordUserInformation.discriminator}`,
      email: discordUserInformation.email,
      profile_image_url: `https://cdn.discordapp.com/avatars/${discordUserInformation.id}/${discordUserInformation.avatar}.png`,
      discord_access_token: discordAuthenticationInformation.access_token,
      discord_refresh_token: discordAuthenticationInformation.refresh_token,
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const create_user = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      id,
      email,
      username,
      profile_image_url,
      guilds,
      discord_access_token,
      discord_refresh_token,
    } = req.body;

    const newUser = write_user({
      _id: id,
      email,
      username,
      profile_image_url,
      guilds,
      discord_access_token,
      discord_refresh_token,
    });
    return res.status(200).json(newUser);
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
    const user = await User.findByIdAndDelete(req.params.user_id);

    if (user) return res.status(200).json(user);

    return next({
      status: 404,
      message: `There was no user found with the ID: ${req.params.user_id}.`,
    });
  } catch (error) {
    return next(error);
  }
};
