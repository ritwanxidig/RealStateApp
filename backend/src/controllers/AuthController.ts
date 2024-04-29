import express from "express";
import { UserModel, create, getByEmail, getByUsername } from "../models/User";
import {
  authenticate,
  checkUserPassword,
  errorHandler,
  random,
} from "../utils";
import dotenv from "dotenv";
dotenv.config();

export const logOut = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.clearCookie("session-token");
  return res.status(200).json("Logged out successfully");
};

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

    user.authentication.sessionToken = sessionToken;

    await user.save();

    res.cookie("session-token", user.authentication.sessionToken, {
      path: "/",
      domain: process.env.DOMAIN,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 0.5),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "none" : undefined,
    });

    const {
      username,
      name,
      email: Email,
      roles,
      _id: userId,
      profilePic,
    } = user;

    return res
      .status(200)
      .json({ name, username, Email, roles, userId, profilePic });
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

export const signInWithGoogle = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const {
      name: ProvidedName,
      email,
      profilePic: ProvidedProfilePic,
    } = req.body;

    if (!ProvidedName || !email || !ProvidedProfilePic) {
      return next(
        errorHandler(400, "Please provide name, email and profilePic")
      );
    }

    // if user already exists
    const user = await getByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (user) {
      const sessionToken = authenticate(
        user.authentication.salt,
        user._id.toString()
      );

      user.authentication.sessionToken = sessionToken;

      await user.save();

      res.cookie("session-token", user.authentication.sessionToken, {
        path: "/",
        domain: process.env.DOMAIN,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 0.5),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      const {
        username,
        name,
        email: Email,
        roles,
        _id: userId,
        profilePic,
      } = user;

      return res
        .status(200)
        .json({ name, username, Email, roles, userId, profilePic });
    }

    // if user is new to the application
    else {
      const generatedUsername =
        ProvidedName.split(" ").join("_").toLowerCase() +
        "_" +
        Math.round(Math.random() * 1000);
      const generatedPassword = random();
      const salt = random();
      const hashedPassword = authenticate(salt, generatedPassword);

      const newUser = await create({
        name: ProvidedName,
        username: generatedUsername,
        email,
        profilePic: ProvidedProfilePic,
        authentication: { salt, password: hashedPassword },
      });

      const sessionToken = authenticate(
        newUser.authentication.salt,
        newUser._id.toString()
      );

      newUser.authentication.sessionToken = sessionToken;

      await newUser.save();

      res.cookie("session-token", newUser.authentication.sessionToken, {
        path: "/",
        domain: process.env.DOMAIN,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 0.5),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      const {
        username,
        name,
        email: Email,
        roles,
        _id: userId,
        profilePic,
      } = newUser;

      return res
        .status(200)
        .json({ name, username, Email, roles, userId, profilePic });
    }
  } catch (error) {
    next(error);
  }
};
