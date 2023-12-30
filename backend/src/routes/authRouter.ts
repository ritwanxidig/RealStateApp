import { logOut, login, registration } from "../controllers/AuthController";
import express from "express";

export default (router: express.Router) => {
  router.post("/auth/registration", registration);
  router.post("/auth/login", login);
  router.post("/auth/logout", logOut);
};
