import express from "express";
import { AppError } from "interfaces";

export const ExceptionHandlerMiddleware = (
  err: AppError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error!";
  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
