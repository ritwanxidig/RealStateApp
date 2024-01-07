import { Router } from "express";
import {
  addProperty,
  deleteProperty,
  editProperty,
  getAllProperties,
  getMyProperty,
  getProperty,
  searchProperty,
} from "../controllers/PropertyController";
import { IsAuthenticated } from "../middleware";

export default (router: Router) => {
  // for public access
  router.get("/properties", getAllProperties);
  router.get("/properties/search", searchProperty);

  // for private access
  router.get("/properties/:id", IsAuthenticated, getProperty);
  router.get("/my-properties", IsAuthenticated, getMyProperty);
  router.post("/properties", IsAuthenticated, addProperty);
  router.put("/properties/:id", IsAuthenticated, editProperty);
  router.delete("/properties/:id", IsAuthenticated, deleteProperty);
};
