import { Router, Request, Response, NextFunction } from "express";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";

import Controller from "../interfaces/controller.interface";
import Token from "../interfaces/token.interface";
import jwt from "../interfaces/jwt.interface";

import User from "../users/users.interface";
import user_model from "../users/users.model";
import user_dto from "../users/user.dto";

import already_exist_exception from "../exceptions/AlreadyExistException";
import missing_code_exception from "../exceptions/MissingCodeException";
import AlreadyExistException from "../exceptions/AlreadyExistException";

class AuthenticationController implements Controller {
  public path = "/auth";
  public router = Router();
  private user = user_model;

  constructor() {
    this.initialize_routes();
  }

  private initialize_routes() {
    this.router.post("/login", this.register_user);
  }

  private register_user = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user_data: user_dto = req.body;

    if (!req.body.code) return next(new missing_code_exception());

    const code: string = req.body.code;
    const client_id: string = process.env.DISCORD_CLIENT_ID;
    const client_secret: string = process.env.DISCORD_CLIENT_SECRET;

    const auth_request_url: string = "https://discordapp.com/api/oauth2/token";
    const auth_request_body: string = `client_id=${client_id}&client_secret=${client_secret}&code=${code}&grant_type=authorization_code&redirect_uri=http://localhost:8080/`;
    const auth_request_config = {
      headers: {
        "Content-Type": "application/x-www-form-urlendoded",
      },
    };

    const auth_discord = await axios.post(
      auth_request_url,
      auth_request_body,
      auth_request_config
    );

    const auth_discord_data = auth_discord.data;

    const user_request_url: string = "https://discordapp.com/api/users/@me";
    const user_request_config = {
      headers: {
        Authorization: `Bearer ${auth_discord_data.access_token}`,
      },
    };

    const discord_user = await axios.get(user_request_url, user_request_config);

    const discord_user_data = discord_user.data;

    const new_user_data: User = {
      _id: auth_discord_data.id,
      email: discord_user_data.email,
      username: `${discord_user_data.username}#${discord_user_data.discriminator}`,
      profile_image_url: `https://cdn.discordapp.com/avatars/${discord_user_data.id}/${discord_user_data.avatar}.png`,
      discord_access_token: auth_discord_data.access_token,
      discord_refresh_token: auth_discord_data.refresh_token,
      guilds: [],
    };

    const new_user = await this.user.create(new_user_data);

    const token_data = this.create_token(new_user);

    return res.status(200).json(new_user);
  };

  private create_token = (user: User): Token => {
    const { _id, discord_access_token } = user;
    const expiresIn = 86400; // One Day
    const jwt_token = jsonwebtoken.sign(
      { _id, discord_access_token },
      process.env.JWT_SECRET,
      {
        expiresIn,
      }
    );

    return {
      expires_in: expiresIn,
      token: jwt_token,
    };
  };
}

export default AuthenticationController;
