import { Router } from "express";
import {
  addProperty,
  deleteProperty,
  editProperty,
  getAllProperties,
} from "../controllers/PropertyController";
import { IsAuthenticated } from "../middleware";

export default (router: Router) => {
  router.get("/properties", IsAuthenticated, getAllProperties);
  router.post("/properties", IsAuthenticated, addProperty);
  router.put("/properties/:id", IsAuthenticated, editProperty);
  router.delete("/properties/:id", IsAuthenticated, deleteProperty);
};
