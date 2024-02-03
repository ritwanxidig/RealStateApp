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
    const targetC = await getCities(countryId);
    return res.status(200).json(targetC.cities);
  } catch (error) {
    next(error);
  }
};

export const getSingleCity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, countryId } = req.params;
  if (!mongoose.isValidObjectId(id))
    return next(errorHandler(400, "Please provide valid city id"));
  if (!mongoose.isValidObjectId(countryId))
    return next(errorHandler(400, "Please provide valid country id"));
  try {
    const city = await getCityById(id, countryId);
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
  const { countryId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(countryId)) {
    return next(errorHandler(400, "Please provide a valid CountryId"));
  }
  try {
    const { cityName } = req.body;

    if (!cityName) {
      return next(
        errorHandler(400, "Please provide country name and city name")
      );
    }

    // get the country
    const country = await getCountryById(countryId);
    // check if the country exists
    if (!country) {
      return next(errorHandler(400, `${countryId} Country not found`));
    }
    // check if the city already exists
    const existCity = await getCityByName(countryId, cityName);
    if (existCity) {
      return next(
        errorHandler(
          400,
          `${cityName} City already exists in the ${country.name} country`
        )
      );
    }

    const city = await createCity({ id: countryId }, cityName);
    return res.status(200).json(city.cities);
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
    const { countryId, cityId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cityId)) {
      return next(errorHandler(400, "Please provide a valid CityId"));
    }

    if (!mongoose.Types.ObjectId.isValid(countryId)) {
      return next(errorHandler(400, "Please provide a valid CountryId"));
    }

    const { name } = req.body;
    if (!name) {
      return next(errorHandler(400, "Please provide the name "));
    }
    // get the country
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

    const city = await updateCity(cityId, countryId, name);
    return res.status(200).json(city.cities);
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
    const { countryId, cityId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(countryId)) {
      return next(errorHandler(400, "Please provide a valid Country Id"));
    }

    // check the cityID is
    if (!mongoose.Types.ObjectId.isValid(cityId)) {
      return next(errorHandler(400, "Please provide a valid City Id"));
    }

    // get the country
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

    const city = await removeCity(cityId, countryId);
    return res.status(200).json(city.cities);
  } catch (error) {
    next(error);
  }
};
