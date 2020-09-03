import { Router, Request, Response, NextFunction } from "express";
import Guild from "./guilds.interface";
import guildModel from "./guilds.model";
import GuildDTO from "./guilds.dto";
import GuildNotFoundException from "../exceptions/GuildNotFoundException";
import Controller from "../interfaces/controller.interface";
import validation from "../middleware/validation.middleware";

class GuildController implements Controller {
  public path = "/guilds";
  public router = Router();
  private guild = guildModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get(this.path, this.getAllGuilds);
    this.router.post(`${this.path}`, validation(GuildDTO), this.createGuild);
    this.router.get(`${this.path}/:id`, this.getGuildByID);
    this.router.patch(
      `${this.path}/:id`,
      validation(GuildDTO),
      this.modifyGuild
    );
    this.router.delete(`${this.path}/:id`, this.deleteGuild);
  };

  private getAllGuilds = async (req: Request, res: Response) => {
    try {
      const guilds = await this.guild.find();
      this.router.get(this.path, this.getAllGuilds);
      this.router.post(`${this.path}`, validation(GuildDTO), this.createGuild);
      this.router.get(`${this.path}/:id`, this.getGuildByID);
      this.router.patch(
        `${this.path}/:id`,
        validation(GuildDTO),
        this.modifyGuild
      );
      this.router.delete(`${this.path}/:id`, this.deleteGuild);
      return res.status(200).json(guilds);
    } catch (error) {
      throw new Error(error);
    }
  };

  private getGuildByID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const guild = await this.guild.findById(req.params.id);
      if (guild) return res.status(200).json(guild);

      return next(new GuildNotFoundException(req.params.id));
    } catch (error) {
      return next();
    }
  };

  private modifyGuild = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const guildData: Guild = req.body;
      const guild = await this.guild.findByIdAndUpdate(
        req.params.id,
        guildData,
        {
          new: true,
        }
      );

      if (guild) return res.status(200).json(guild);

      return next(new GuildNotFoundException(req.params.id));
    } catch (error) {
      return next();
    }
  };

  private createGuild = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const guildData: Guild = req.body;
      const newGuild = new this.guild(guildData);
      await newGuild.save();

      return res.status(200).json(newGuild);
    } catch (error) {
      return next();
    }
  };

  private deleteGuild = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const deletedGuild = await this.guild.findByIdAndDelete(req.params.id);
      if (deletedGuild) return res.status(200).send({});

      return next(new GuildNotFoundException(req.params.id));
    } catch (error) {
      return next();
    }
  };
}

export default GuildController;
