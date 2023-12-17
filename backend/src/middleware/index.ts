import express, { Request, Response, NextFunction } from "express";
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

export const IsAuthorized =  (authorizedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = get(req, "identity") as Record<string, any>;
    if (!user) {
      return next(errorHandler(401, "you are not authenticated to access!"));
    }

    const isAuthorized = user?.roles?.some(
      (role: string) => role && authorizedRoles.includes(role)
    );
    if (!isAuthorized) {
      return next(errorHandler(401, "you are not authorized!"));
    }

    next();
  };
};
