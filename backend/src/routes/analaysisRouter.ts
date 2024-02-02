import AnalaysisController from "../controllers/AnalaysisController";
import { Router } from "express";

export default (router: Router) => {
  router.get("/analaysis", AnalaysisController.getOverviewAnalaysis);
};
