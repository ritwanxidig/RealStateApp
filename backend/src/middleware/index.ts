import express from "express";
import { AppError } from "interfaces";
import { getBySessionToken } from "../models/User";
import { errorHandler } from "../utils";
import { get, merge, identity } from "lodash";

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

export const IsAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const sessionToken = req.cookies["session-token"];
  if (!sessionToken) {
    return next(errorHandler(401, "you are not authenticated!"));
  }

  // check if the token is valid
  const tokenUser = await getBySessionToken(sessionToken);
  if (!tokenUser) {
    return next(
      errorHandler(401, "you are not authenticated, your token is invalid!")
    );
  }
  merge(req, { identity: tokenUser });
  next();
};
