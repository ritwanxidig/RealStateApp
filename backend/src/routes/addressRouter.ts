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

  router.get("/cities/:countryName", getAllCities);
  router.get("/cities/:countryName/:id", getSingleCity);
  router.post("/cities/:countryName", createNewCity);
  router.put("/cities/:countryName/:cityId", EditCity);
  router.delete("/cities/:countryName/:cityId", DeleteCity);

  router.get("/locations/:countryName/:cityName", GetAllLocations);
  router.post("/locations/:countryName/:cityName", addNewLocation);
  router.put("/locations/:countryName/:cityName/:locationId", editLocation);
  router.delete(
    "/locations/:countryName/:cityName/:locationId",
    removeLocation
  );
};
