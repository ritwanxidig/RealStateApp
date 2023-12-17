import { Roles } from "../constants/index";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      required: true,
      default: [Roles.User],
    },
    authentication: {
      password: {
        type: String,
        required: true,
        select: false,
      },
      salt: {
        type: String,
        select: false,
      },
      sessionToken: {
        type: String,
        select: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", userSchema);

// basic functions for user model
export const getAll = () => UserModel.find();
export const getByUsername = (username: string) =>
  UserModel.findOne({ username });
export const getByEmail = (email: string) => UserModel.findOne({ email });
export const getById = (id: string) => UserModel.findById(id);
export const getBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const create = (user: Record<string, any>) => UserModel.create(user);
export const update = (id: string, user: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, user);
export const remove = (id: string) => UserModel.findByIdAndDelete(id);
