import { Router, Request, Response, NextFunction } from "express";
import User from "./users.interface";
import user_model from "./users.model";
import user_not_found_exception from "../exceptions/UserNotFoundException";
import validation from "../middleware/validation.middleware";
import user_dto from "./user.dto";
import HttpException from "../exceptions/HttpException";

class UserController {
  public path = "/users";
  public router = Router();
  private user = user_model;

  constructor() {
    this.initialize_routes();
  }

  private initialize_routes() {
    this.router.get(this.path, this.get_all_users);
    this.router.post(`${this.path}`, validation(user_dto), this.create_user);
    this.router.get(`${this.path}/:id`, this.get_user_by_id);
    this.router.patch(
      `${this.path}/:id`,
      validation(user_dto),
      this.modify_user
    );
    this.router.delete(`${this.path}/:id`, this.delete_user);
  }

  private get_all_users = async (req: Request, res: Response) => {
    try {
      const users = await this.user.find();

      return res.status(200).json(users);
    } catch (error) {
      throw new Error(error);
    }
  };

  private get_user_by_id = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.user.findById(req.params.id);
      if (user) return res.status(200).json(user);

      return next(new user_not_found_exception(req.params.id));
    } catch (error) {
      return next();
    }
  };

  private modify_user = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user_data: User = req.body;
      const user = await this.user.findByIdAndUpdate(req.params.id, user_data, {
        new: true,
      });

      if (user) return res.status(200).json(user);

      return next(new user_not_found_exception(req.params.id));
    } catch (error) {
      return next();
    }
  };

  private create_user = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user_data: User = req.body;
      const new_user = new this.user(user_data);

      await new_user.save();

      return res.status(200).json(new_user);
    } catch (error) {
      return next();
    }
  };

  private delete_user = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const deleted_user = await this.user.findByIdAndDelete(req.params.id);
      if (deleted_user) return res.status(200).send({});

      return next(new user_not_found_exception(req.params.id));
    } catch (error) {
      return next();
    }
  };
}

export default UserController;
