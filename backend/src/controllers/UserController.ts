import express, { Request, Response, NextFunction } from "express";

import { getAll, getById } from "../models/User";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAll();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await getById(id);
    const { name, username, email } = user;
    return res.status(200).json({ name, username, email });
  } catch (error) {
    return next(error);
  }
};
