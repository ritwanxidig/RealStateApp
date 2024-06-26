import { IsAuthenticated, IsAuthorized } from "../middleware";
import {
  updateUser,
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateMe,
} from "../controllers/UserController";
import express from "express";
import { Roles } from "../constants";

export default (router: express.Router) => {
  router.get(
    "/users",
    IsAuthenticated,
    IsAuthorized([Roles.Admin]),
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

  router.put("/users/updateMe/:id", IsAuthenticated, updateMe);

  router.delete(
    "/users/:id",
    IsAuthenticated,
    IsAuthorized([Roles.Admin]),
    deleteUser
  );
};
