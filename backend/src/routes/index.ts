import express from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import addressRouter from "./addressRouter";

const router = express.Router();

export default (): express.Router => {
  authRouter(router);
  userRouter(router);
  addressRouter(router);
  return router;
};
