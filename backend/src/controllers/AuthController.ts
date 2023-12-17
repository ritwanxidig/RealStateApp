import express from "express";
import { UserModel, create, getByEmail, getByUsername } from "../models/User";
import { authenticate, errorHandler, random } from "../utils";

export const registration = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // check the validation
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return next(
        errorHandler(400, "Please provide username, email and password")
      );
    }

    // check if user already exists
    const existEmail = await getByEmail(email);
    if (existEmail) {
      return next(errorHandler(400, "Email already exists"));
    }
    const existUsername = await getByUsername(username);
    if (existUsername) {
      return next(errorHandler(400, "Username already exists"));
    }

    // create for authentication
    const salt = random();
    const hashedPassword = authenticate(salt, password);

    //  save user
    const user = await create({
      name: username.toUpperCase(),
      username,
      email,
      authentication: { salt, password: hashedPassword },
    });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
