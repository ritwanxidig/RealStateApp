import { AppError } from "../interfaces";
import crypto from "crypto";

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
