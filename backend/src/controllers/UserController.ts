import express from "express";

import { getAll } from "models/User";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const users = await getAll();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};
