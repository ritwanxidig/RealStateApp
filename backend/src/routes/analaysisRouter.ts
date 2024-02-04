import { IsAuthenticated } from "../middleware";
import {
  AdminAnalaysisController,
  UserAnalaysisController,
} from "../controllers/AnalaysisController";
import { Router } from "express";

export default (router: Router) => {
  router.get(
    "/analaysis",
    IsAuthenticated,
    AdminAnalaysisController.getOverviewAnalaysis
  );
  router.get(
    "/user/analaysis",
    IsAuthenticated,
    UserAnalaysisController.getUserAnalaysis
  );
};
