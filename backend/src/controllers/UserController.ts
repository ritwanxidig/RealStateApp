import express, { Request, Response, NextFunction } from "express";

import {
  create,
  getAll,
  getByEmail,
  getById,
  getByUsername,
  update,
  remove,
} from "../models/User";
import { authenticate, errorHandler, random } from "../utils";

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

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return next(
        errorHandler(400, "Please provide name, username, email, password ")
      );
    }
    const existByUsername = await getByUsername(username);
    if (existByUsername) {
      return next(errorHandler(400, "Username already exists!"));
    }
    const existByEmail = await getByEmail(email);
    if (existByEmail) {
      return next(errorHandler(400, "Email already exists!"));
    }

    const salt = random();
    const hash = authenticate(salt, password);
    const newUser = await create({
      name,
      username,
      email,
      roles: [req.body.role || "user"],
      authentication: { salt, password: hash },
    });
    const {
      name: newName,
      username: newUsername,
      email: newEmail,
      roles,
    } = newUser;
    return res.status(201).json({ newName, newEmail, newUsername, roles });
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // update only the values to be updated
  try {
    const { id } = req.params;

    const updatedUser = await update(id, {
      $set: {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        roles: req.body.role && [req.body.role],
      },
    });

    if (!updatedUser) {
      return next(errorHandler(404, "User not found!"));
    }
    const { name, username, email, roles } = updatedUser;
    return res.status(200).json({ name, username, email, roles });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedUser = await remove(id);
    if (!deletedUser) {
      return next(errorHandler(404, "User not found!"));
    }
    return res.status(200).json("deleted successfully");
  } catch (error) {
    next(error);
  }
};
