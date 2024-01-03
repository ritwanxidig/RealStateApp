import { NextFunction, Request, Response } from "express";
import {
  getCityById,
  updateCity,
  removeCity,
  getByCountryName,
  getCities,
  getCityByName,
  createCity,
  getCountryById,
} from "../../models/Address";
import { errorHandler } from "../../utils";
import mongoose from "mongoose";

export const getAllCities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { countryId } = req.params;
    if (!mongoose.isValidObjectId(countryId))
      return next(errorHandler(400, "Please provide valid country id"));
    if (!countryId) return next(errorHandler(400, "Please provide country id"));
    // check if the country exists
    const existCountry = await getCountryById(countryId);
    if (!existCountry) {
      return next(errorHandler(400, "Country not found"));
    }
    const cities = await getCities(countryId);
    return res.status(200).json(cities);
  } catch (error) {
    next(error);
  }
};

export const getSingleCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, country } = req.params;
  try {
    const city = (await getCityById(id, country))?.cities[0];
    return res.status(200).json(city);
  } catch (error) {
    next(error);
  }
};

export const createNewCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cityName } = req.body;
    const { countryName } = req.params;
    if (!countryName || !cityName) {
      return next(
        errorHandler(400, "Please provide country name and city name")
      );
    }

    // get the country
    const country = await getByCountryName(countryName);
    // check if the country exists
    if (!country) {
      return next(errorHandler(400, `${countryName} Country not found`));
    }
    // check if the city already exists
    const existCity = await getCityByName(countryName, cityName);
    if (existCity) {
      return next(
        errorHandler(
          400,
          `${cityName} City already exists in the ${countryName} country`
        )
      );
    }

    const city = await createCity({ name: countryName }, cityName);
    return res.status(200).json(city);
  } catch (error) {
    next(error);
  }
};

export const EditCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { countryName, cityId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cityId)) {
      return next(errorHandler(400, "Please provide a valid CityId"));
    }

    const { name } = req.body;
    if (!name) {
      return next(errorHandler(400, "Please provide the name "));
    }
    // get the country
    const country = await getByCountryName(countryName);
    // check if the country exists
    if (!country) {
      return next(errorHandler(400, `${countryName} Country not found`));
    }
    // check if the city already exists
    const existCity = await getCityById(cityId, countryName);
    if (!existCity) {
      return next(errorHandler(400, "this city dos not exists"));
    }

    const city = await updateCity(cityId, countryName, name);
    return res.status(200).json(city);
  } catch (error) {
    next(error);
  }
};

export const DeleteCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { countryName, cityId } = req.params;

    // check the ID is
    if (!mongoose.Types.ObjectId.isValid(cityId)) {
      return next(errorHandler(400, "Please provide a valid CityId"));
    }

    // get the country
    const country = await getByCountryName(countryName);
    // check if the country exists
    if (!country) {
      return next(errorHandler(400, `${countryName} Country not found`));
    }
    // check if the city already exists
    const existCity = await getCityById(cityId, countryName);
    if (!existCity) {
      return next(errorHandler(400, "this city dos not exists"));
    }

    const city = await removeCity(cityId, countryName);
    return res.status(200).json(city);
  } catch (error) {
    next(error);
  }
};
