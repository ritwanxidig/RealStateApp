import { IsAuthenticated, IsAuthorized } from "../middleware";
import { getAllUsers, getUserById } from "../controllers/UserController";
import express from "express";
import { Roles } from "../constants";

export default (router: express.Router) => {
  router.get(
    "/users",
    IsAuthenticated,
    IsAuthorized([Roles.Admin, Roles.User]),
    getAllUsers
  );
  router.get(
    "/users/:id",
    IsAuthenticated,
    getUserById
  );
};
