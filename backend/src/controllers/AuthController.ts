import express from "express";
import { UserModel, create, getByEmail, getByUsername } from "../models/User";
import {
  authenticate,
  checkUserPassword,
  errorHandler,
  random,
} from "../utils";

export const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(errorHandler(400, "Please provide email and password"));
    }

    const user = await getByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const PasswordIsCorrect = checkUserPassword(user, password);
    if (!PasswordIsCorrect) {
      return next(errorHandler(400, "Incorrect Password"));
    }

    const sessionToken = authenticate(
      user.authentication.salt,
      user._id.toString()
    );

    await UserModel.findByIdAndUpdate(user._id, {
      $set: { "authentication.sessionToken": sessionToken },
    });

    res.cookie("session-token", sessionToken, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 0.5),
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 0.5,
    });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

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
