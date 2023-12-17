import { IsAuthenticated } from "../middleware";
import { getAllUsers } from "../controllers/UserController";
import express from "express";

export default (router: express.Router) => {
  router.get("/users", IsAuthenticated, getAllUsers);
};
