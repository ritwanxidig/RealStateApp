import { registration } from "../controllers/AuthController";
import express from "express";

export default (router: express.Router) => {
  router.post("/auth/registration", registration);
};
