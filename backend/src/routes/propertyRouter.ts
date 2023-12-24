import { Router } from "express";
import {
  createProperty,
  getAllProperties,
} from "../controllers/PropertyController";
import { IsAuthenticated } from "../middleware";

export default (router: Router) => {
  router.get("/properties", getAllProperties);
  router.post("/properties", IsAuthenticated, createProperty);
};
