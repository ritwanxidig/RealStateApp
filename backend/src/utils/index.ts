import { AppError } from "../interfaces";
import { UserModel } from "models/User";
import crypto from "crypto";

export * from "./land.utils";
export * from "./property.utils";
export * from "./analaysis.utils";

export const errorHandler = (statusCode: number, message: string) => {
  const error = new AppError(message, statusCode);
  return error;
};

export const random = () => crypto.randomBytes(128).toString("base64");

export const authenticate = (salt: string, password: string) => {
  return crypto
    .createHmac("Sha256", [salt, password].join("/"))
    .update(process.env.APP_SECRET as string)
    .digest("hex");
};

// checking password
export const checkUserPassword = (
  user: Record<string, any>,
  password: string
) => {
  return (
    authenticate(user.authentication.salt, password) ===
    user.authentication.password
  );
};
