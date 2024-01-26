import {
  addNewLand,
  deleteLand,
  getAllLands,
  getSingleLand,
  getUserLands,
  updateLand,
} from "../controllers/LandController";
import { IsAuthenticated } from "../middleware/";
import { Router } from "express";

export default (router: Router) => {
  router.route("/lands/").get(getAllLands).post(IsAuthenticated, addNewLand);
  router.get("/lands/myLands", IsAuthenticated, getUserLands);
  router
    .route("/lands/:id")
    .get(getSingleLand)
    .put(updateLand)
    .delete(deleteLand);
};
