import { Router } from "express";
import { getAllProperties } from "../controllers/PropertyController";

export default (router: Router) => {
  router.get("/properties", getAllProperties);
};
