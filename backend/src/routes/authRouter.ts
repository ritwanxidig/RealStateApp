import {
  logOut,
  login,
  registration,
  signInWithGoogle,
} from "../controllers/AuthController";
import express from "express";

export default (router: express.Router) => {
  router.post("/auth/register", registration);
  router.post("/auth/login", login);
  router.post("/auth/google", signInWithGoogle);
  router.post("/auth/logout", logOut);
};
