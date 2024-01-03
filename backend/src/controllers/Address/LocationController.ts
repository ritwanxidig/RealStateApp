import { Request, Response, NextFunction } from "express";
import {
    addLocation,
    deleteLocation,
    getLocationById,
    getLocationByName,
    getLocations,
    updateLocation,
} from "../../models/Address";
import { errorHandler } from "../../utils";
import { getByCountryName, getCityByName } from "../../models/Address";

export const GetAllLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { countryName, cityName } = req.params;

    // check if the country exists
    const existCountry = await getByCountryName(countryName);
    if (!existCountry) {
      return next(errorHandler(400, "Country not found"));
    }
    // check if the city already exists
    const existCity = await getCityByName(countryName, cityName);
    if (!existCity) {
      return next(errorHandler(400, "this city dos not exists"));
    }
    const locations = await getLocations(countryName, cityName);
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
    const { countryName, cityName } = req.params;
    const { location } = req.body;
    if (!location)
      return next(errorHandler(400, "please provide the location"));

    // check the country
    const country = await getByCountryName(countryName);
    // check if the country exists
    if (!country) {
      return next(errorHandler(400, `${countryName} Country not found`));
    }
    // check if the city already exists
    const existCity = await getCityByName(countryName, cityName);
    if (!existCity) {
      return next(errorHandler(400, "this city dos not exists"));
    }

    // check if the location already exists
    const existLocation = await getLocationByName(
      countryName,
      cityName,
      location
    );
    if (existLocation) {
      return next(errorHandler(400, "this location already exists"));
    }
    // add the location to the city
    const city = await addLocation(countryName, cityName, location);
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
    const { countryName, cityName, locationId } = req.params;
    const { name } = req.body;

    // check the country
    const country = await getByCountryName(countryName);
    // check if the country exists
    if (!country) {
      return next(errorHandler(400, `${countryName} Country not found`));
    }
    // check if the city already exists
    const existCity = await getCityByName(countryName, cityName);
    if (!existCity) {
      return next(errorHandler(400, "this city dos not exists"));
    }
    // check if the location already exists
    const existLocation = await getLocationById(
      countryName,
      cityName,
      locationId
    );
    if (!existLocation) {
      return next(errorHandler(400, "this location dos not exists"));
    }

    // update the location
    const city = await updateLocation(locationId, countryName, cityName, name);
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
    const { countryName, cityName, locationId } = req.params;

    // check the country
    const country = await getByCountryName(countryName);
    // check if the country exists
    if (!country) {
      return next(errorHandler(400, `${countryName} Country not found`));
    }
    // check if the city already exists
    const existCity = await getCityByName(countryName, cityName);
    if (!existCity) {
      return next(errorHandler(400, "this city dos not exists"));
    }
    // check if the location already exists
    const existLocation = await getLocationById(
      countryName,
      cityName,
      locationId
    );
    if (!existLocation) {
      return next(errorHandler(400, "this location dos not exists"));
    }
    // remove the location
    const city = await deleteLocation(locationId, countryName, cityName);
    return res.status(200).json(city);
  } catch (error) {
    next(error);
  }
};
