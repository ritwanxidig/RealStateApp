import { Router } from "express";
import {
  addProperty,
  editProperty,
  getAllProperties,
} from "../controllers/PropertyController";
import { IsAuthenticated } from "../middleware";

export default (router: Router) => {
  router.get("/properties", getAllProperties);
  router.post("/properties", IsAuthenticated, addProperty);
  router.put("/properties/:id", IsAuthenticated, editProperty);
};
