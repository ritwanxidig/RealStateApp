import { IsAuthenticated, IsAuthorized } from "../middleware";
import {
  updateUser,
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/UserController";
import express from "express";
import { Roles } from "../constants";

export default (router: express.Router) => {
  router.get(
    "/users",
    IsAuthenticated,
    IsAuthorized([Roles.User]),
    getAllUsers
  );
  router.get("/users/:id", IsAuthenticated, getUserById);
  router.post(
    "/users",
    IsAuthenticated,
    IsAuthorized([Roles.Admin]),
    createUser
  );
  router.put(
    "/users/:id",
    IsAuthenticated,
    IsAuthorized([Roles.Admin]),
    updateUser
  );
  router.delete(
    "/users/:id",
    IsAuthenticated,
    // IsAuthorized([Roles.Admin]),
    deleteUser
  );
};
