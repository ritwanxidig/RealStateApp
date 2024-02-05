import { IsAuthenticated, IsAuthorized } from "../middleware";
import {
  AdminAnalaysisController,
  UserAnalaysisController,
} from "../controllers/AnalaysisController";
import { Router } from "express";
import { Roles } from "../constants";

export default (router: Router) => {
  router.get(
    "/analaysis",
    IsAuthenticated,
    IsAuthorized([Roles.Admin]),
    AdminAnalaysisController.getOverviewAnalaysis
  );
  router.get(
    "/user/analaysis",
    IsAuthenticated,
    UserAnalaysisController.getUserAnalaysis
  );
};
