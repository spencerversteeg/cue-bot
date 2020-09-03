import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import MissingTokenException from "../exceptions/MissingTokenException";

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

export { loginRequired, correctUser };
