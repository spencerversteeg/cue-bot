import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import userModel from "../users/users.model";
import MissingTokenException from "../exceptions/MissingTokenException";
import includedUserRequest from "../interfaces/includedUserRequest.interface";

const loginRequired = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return next(new MissingTokenException());

  const token = req.headers.authorization.split(" ")[1];
  if (!token) return next(new MissingTokenException());

  jwt.verify(token, process.env.JWT_SECRET, (decoded) => {
    if (decoded) return next();

    return next(new MissingTokenException());
  });
};

const correctUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) return next(new MissingTokenException());

    const token = req.headers.authorization.split(" ")[1];
    if (!token) return next(new MissingTokenException());

    jwt.verify(token, process.env.JWT_SECRET, (decoded) => {
      if (decoded && decoded._id === req.params.id) return next();

      return next(new MissingTokenException());
    });
  } catch (error) {
    return next(new MissingTokenException());
  }
};

const authenticate = async (
  req: includedUserRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies || !req.cookies.Authorization)
    return next(new MissingTokenException());

  const { Authorization } = req.cookies;

  try {
    const verifiedToken = await jwt.verify(
      Authorization,
      process.env.JWT_SECRET
    );
    const id = verifiedToken._id;
    const user = await userModel.findById(id);

    if (!user) return next(new MissingTokenException());

    req.user = user;
    return next();
  } catch (error) {
    return next(new MissingTokenException());
  }
};

export { loginRequired, correctUser, authenticate };
