import { Router, Request, Response, NextFunction } from "express";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";

import Controller from "../interfaces/controller.interface";
import Token from "../interfaces/token.interface";
import jwt from "../interfaces/jwt.interface";

import User from "../users/users.interface";
import user_model from "../users/users.model";
import user_dto from "../users/user.dto";

import MissingCodeException from "../exceptions/MissingCodeException";
import AlreadyExistException from "../exceptions/AlreadyExistException";

class AuthenticationController implements Controller {
  public path = "/auth";
  public router = Router();
  private user = user_model;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/login", this.registerUser);
  }

  private registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user_data: user_dto = req.body;

    if (!req.body.code) return next(new MissingCodeException());

    const code: string = req.body.code;
    const clientID: string = process.env.DISCORD_CLIENT_ID;
    const clientSecret: string = process.env.DISCORD_CLIENT_SECRET;

    const authRequestURL: string = "https://discordapp.com/api/oauth2/token";
    const authRequestBody: string = `client_id=${clientID}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=http://localhost:8080/`;
    const authRequestConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlendoded",
      },
    };

    const authDiscord = await axios.post(
      authRequestURL,
      authRequestBody,
      authRequestConfig
    );

    const authDiscordData = authDiscord.data;

    const discordUserData = await this.getDiscordUserData(authDiscordData);

    const newUserData: User = {
      _id: authDiscordData.id,
      email: discordUserData.email,
      username: `${discordUserData.username}#${discordUserData.discriminator}`,
      profile_image_url: `https://cdn.discordapp.com/avatars/${discordUserData.id}/${discordUserData.avatar}.png`,
      discord_access_token: authDiscordData.access_token,
      discord_refresh_token: authDiscordData.refresh_token,
      guilds: [],
    };

    const newUser = await this.user.create(newUserData);

    const token_data = this.createToken(newUserData);

    return res.status(200).json(newUser);
  };

  private getDiscordUserData = async (user) => {
    const userRequestURL: string = "https://discordapp.com/api/users/@me";
    const userRequestConfig = {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    };

    const discordUser = await axios.get(userRequestURL, userRequestConfig);

    return discordUser.data;
  };

  private createToken = (user: User): Token => {
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
