import { Router, Request, Response, NextFunction } from "express";
import User from "./users.interface";
import userModel from "./users.model";
import UserNotFoundException from "../exceptions/UserNotFoundException";
import validation from "../middleware/validation.middleware";
import UserDTO from "./user.dto";
import Controller from "../interfaces/controller.interface";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get(this.path, this.getAllUsers);
    this.router.post(`${this.path}`, validation(UserDTO), this.createUser);
    this.router.get(`${this.path}/:id`, this.getUserByID);
    this.router.patch(`${this.path}/:id`, validation(UserDTO), this.modifyUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
  };

  private getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.user.find();

      return res.status(200).json(users);
    } catch (error) {
      throw new Error(error);
    }
  };

  private getUserByID = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.user.findById(req.params.id);
      if (user) return res.status(200).json(user);

      return next(new UserNotFoundException(req.params.id));
    } catch (error) {
      return next();
    }
  };

  private modifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: User = req.body;
      const user = await this.user.findByIdAndUpdate(req.params.id, userData, {
        new: true,
      });

      if (user) return res.status(200).json(user);

      return next(new UserNotFoundException(req.params.id));
    } catch (error) {
      return next();
    }
  };

  private createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: User = req.body;
      const newUser = new this.user(userData);

      await newUser.save();

      return res.status(200).json(newUser);
    } catch (error) {
      return next();
    }
  };

  private deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const deletedUser = await this.user.findByIdAndDelete(req.params.id);
      if (deletedUser) return res.status(200).send({});

      return next(new UserNotFoundException(req.params.id));
    } catch (error) {
      return next();
    }
  };
}

export default UserController;
