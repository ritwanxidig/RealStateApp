import {
  DeleteCity,
  EditCity,
  GetAllLocations,
  addNewLocation,
  createCountry,
  createNewCity,
  deleteCountry,
  editLocation,
  getAllCities,
  getAllCountries,
  getSingleCity,
  getSingleCountry,
  removeLocation,
  updateCountry,
} from "../controllers/AddressController";
import express from "express";

export default (router: express.Router) => {
  router.get("/countries", getAllCountries);
  router.get("/countries/:id", getSingleCountry);
  router.post("/countries", createCountry);
  router.put("/countries/:id", updateCountry);
  router.delete("/countries/:id", deleteCountry);

  router.get("/cities/:countryId", getAllCities);
  router.get("/cities/:countryId/:id", getSingleCity);
  router.post("/cities/:countryId", createNewCity);
  router.put("/cities/:countryId/:cityId", EditCity);
  router.delete("/cities/:countryId/:cityId", DeleteCity);

  router.get("/locations/:countryId/:cityId", GetAllLocations);
  router.post("/locations/:countryId/:cityId", addNewLocation);
  router.put("/locations/:countryId/:cityId/:locationId", editLocation);
  router.delete(
    "/locations/:countryId/:cityId/:locationId",
    removeLocation
  );
};
