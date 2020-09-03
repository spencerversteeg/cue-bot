import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";

const error = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "An internal server error has occured.";

  res.status(status).json({ status, message });
};

export default error;
