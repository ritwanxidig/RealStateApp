import express from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import addressRouter from "./addressRouter";
import propertyRouter from "./propertyRouter";
import landRouter from "./landRouter";

const router = express.Router();

export default (): express.Router => {
  authRouter(router);
  userRouter(router);
  addressRouter(router);
  propertyRouter(router);
  landRouter(router);
  return router;
};
