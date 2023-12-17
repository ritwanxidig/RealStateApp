import express from "express";
import authRouter from "./authRouter";

const router = express.Router();

export default (): express.Router => {
  authRouter(router);
  return router;
};
