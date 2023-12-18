import {
  createCountry,
  deleteCountry,

  getAllCountries,
  updateCountry,
} from "../controllers/AddressController";
import express from "express";

export default (router: express.Router) => {
  router.get("/countries", getAllCountries);
  router.post("/countries", createCountry);
  router.put("/countries/:id", updateCountry);
  router.delete("/countries/:id", deleteCountry);


  // router.get("/cities/:countryName", getAllCities);
  // router.post("/cities/:countryName", createNewCity);
};
