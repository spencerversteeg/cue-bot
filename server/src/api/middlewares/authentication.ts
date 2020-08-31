import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const login_required = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verified = await jwt.verify(token, process.env.JWT_SECRET);

    if (verified) return next();

    return next({
      status: 401,
      message: "You must be logged in to access this information.",
    });
  } catch (error) {
    return next({
      status: 401,
      message: "You must be logged in to access this information.",
    });
  }
};

export const correct_user = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verified = await jwt.verify(token, process.env.JWT_SECRET);

    if (verified && verified.id === req.params.user_id) return next();

    return next({
      status: 401,
      message: "Unauthorized",
    });
  } catch (error) {
    return next({
      status: 401,
      message: "Unauthorized",
    });
  }
};
