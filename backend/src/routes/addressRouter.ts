import {
  DeleteCity,
  EditCity,
  createCountry,
  createNewCity,
  deleteCountry,
  getAllCities,
  getAllCountries,
  updateCountry,
} from "../controllers/AddressController";
import express from "express";

export default (router: express.Router) => {
  router.get("/countries", getAllCountries);
  router.post("/countries", createCountry);
  router.put("/countries/:id", updateCountry);
  router.delete("/countries/:id", deleteCountry);

  router.get("/cities/:countryName", getAllCities);
  router.post("/cities/:countryName", createNewCity);
  router.put("/cities/:countryName/:cityId", EditCity);
  router.delete("/cities/:countryName/:cityId", DeleteCity);
};
