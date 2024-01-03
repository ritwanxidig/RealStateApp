import { Request, Response, NextFunction } from "express";
import {
  addLocation,
  deleteLocation,
  getCityById,
  getCountryById,
  getLocationById,
  getLocationByName,
  getLocations,
  updateLocation,
} from "../../models/Address";
import { errorHandler } from "../../utils";
import { getByCountryName, getCityByName } from "../../models/Address";
import mongoose from "mongoose";

export const GetAllLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { countryId, cityId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(countryId)) {
      return next(errorHandler(400, "Please provide a valid Country Id"));
    }
    if (!mongoose.Types.ObjectId.isValid(cityId)) {
      return next(errorHandler(400, "Please provide a valid City Id"));
    }

    // check if the country exists
    const existCountry = await getCountryById(countryId);
    if (!existCountry) {
      return next(errorHandler(400, "Country not found"));
    }
    // check if the city already exists
    const existCity = await getCityById(cityId, countryId);
    if (!existCity) {
      return next(
        errorHandler(
          400,
          `this city dos not exist in ${existCountry.name} country`
        )
      );
    }
    const locations = await getLocations(countryId, cityId);
    return res.status(200).json(locations);
  } catch (error) {
    next(error);
  }
};

export const addNewLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { countryId, cityId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(countryId)) {
      return next(errorHandler(400, "Please provide a valid Country Id"));
    }
    if (!mongoose.Types.ObjectId.isValid(cityId)) {
      return next(errorHandler(400, "Please provide a valid City Id"));
    }
    const { location } = req.body;
    if (!location)
      return next(errorHandler(400, "please provide the location"));

    // check the country
    const country = await getCountryById(countryId);
    // check if the country exists
    if (!country) {
      return next(errorHandler(400, `${countryId} Country not found`));
    }
    // check if the city already exists
    const existCity = await getCityById(cityId, countryId);
    if (!existCity) {
      return next(errorHandler(400, "this city dos not exists"));
    }

    // check if the location already exists
    const existLocation = await getLocationByName(countryId, cityId, location);
    if (existLocation) {
      return next(
        errorHandler(400, `${location.toUpperCase()} location already exists`)
      );
    }
    // add the location to the city
    const city = await addLocation(countryId, cityId, location);
    return res.status(200).json(city);
  } catch (error) {
    next(error);
  }
};

export const editLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { countryId, cityId, locationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(countryId)) {
      return next(errorHandler(400, "Please provide a valid Country Id"));
    }
    if (!mongoose.Types.ObjectId.isValid(cityId)) {
      return next(errorHandler(400, "Please provide a valid City Id"));
    }
    if (!mongoose.Types.ObjectId.isValid(locationId)) {
      return next(errorHandler(400, "Please provide a valid Location Id"));
    }
    const { name } = req.body;

    // check the country
    const country = await getCountryById(countryId);
    // check if the country exists
    if (!country) {
      return next(errorHandler(400, `${countryId} Country not found`));
    }
    // check if the city already exists
    const existCity = await getCityById(cityId, countryId);
    if (!existCity) {
      return next(errorHandler(400, "this city dos not exists"));
    }
    // check if the location already exists
    const existLocation = await getLocationById(countryId, cityId, locationId);
    if (!existLocation) {
      return next(errorHandler(400, "this location dos not exists"));
    }

    // update the location
    const city = await updateLocation(locationId, countryId, cityId, name);
    return res.status(200).json(city);
  } catch (error) {
    next(error);
  }
};

export const removeLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { countryId, cityId, locationId } = req.params;

    // check the country
    const country = await getCountryById(countryId);
    // check if the country exists
    if (!country) {
      return next(errorHandler(400, `${countryId} Country not found`));
    }
    // check if the city already exists
    const existCity = await getCityById(cityId, countryId);
    if (!existCity) {
      return next(errorHandler(400, "this city dos not exists"));
    }
    // check if the location already exists
    const existLocation = await getLocationById(countryId, cityId, locationId);
    if (!existLocation) {
      return next(errorHandler(400, "this location dos not exists"));
    }
    // remove the location
    const city = await deleteLocation(locationId, countryId, cityId);
    return res.status(200).json(city);
  } catch (error) {
    next(error);
  }
};
