import {
  createCountry,
  createNewCity,
  getAllCities,
  getAllCountries,
} from "../controllers/AddressController";
import express from "express";

export default (router: express.Router) => {
  router.get("/countries", getAllCountries);
  router.post("/countries", createCountry);
  router.get("/cities/:countryName", getAllCities);
  router.post("/cities/:countryName", createNewCity);
};
