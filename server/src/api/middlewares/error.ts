import { Request, Response, NextFunction } from "express";

interface error {
  status: number;
  message: string;
}

const errorHandler = (
  error: error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return response.status(error.status || 500).json({
    error: {
      message: error.message || "Oops! Something went wrong.",
    },
  });
};

export default errorHandler;
