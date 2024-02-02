import express from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import addressRouter from "./addressRouter";
import propertyRouter from "./propertyRouter";
import landRouter from "./landRouter";
import analaysisRouter from "./analaysisRouter";

const router = express.Router();

export default (): express.Router => {
  analaysisRouter(router);
  authRouter(router);
  userRouter(router);
  addressRouter(router);
  propertyRouter(router);
  landRouter(router);
  return router;
};
