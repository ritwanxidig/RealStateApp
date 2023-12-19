import express, { NextFunction, Request, Response } from "express";
import {
  getAllCountries as getAllCount,
  getByCountryName,
  createCountry as crateCount,
  createCity,
  getCityByName,
  getCities,
  updateCountry as EditCountry,
  deleteCountry as RemoveCountry,
  getCountryById,
  getCityById,
  updateCity,
  removeCity,
  getLocations
} from "../models/Address";
import { errorHandler } from "../utils";
import mongoose from "mongoose";

export const getAllCountries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const countries = await getAllCount();
    return res.status(200).json({ length: countries.length, countries });
  } catch (error) {
    next(error);
  }
};

export const createCountry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    if (!name) return next(errorHandler(400, "Please provide country name"));
    // check if the country exists before
    const existCountry = await getByCountryName(name);
    if (existCountry) {
      return next(errorHandler(400, "Country already exists"));
    }
    const country = await crateCount({ name });
    return res.status(200).json({ country });
  } catch (error) {
    console.log(error);
  }
};

export const updateCountry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const { name } = req.body;
    if (!name) return next(errorHandler(400, "Please provide country name"));
    // check if the country exists before
    const existCountry = await getCountryById(id);
    if (!existCountry) {
      return next(errorHandler(400, "Country not found"));
    }
    const country = await EditCountry(id, { name });
    return res.status(200).json({ country });
  } catch (error) {}
};

export const deleteCountry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const existCountry = await getCountryById(id);
    if (!existCountry) {
      return next(errorHandler(400, "Country not found"));
    }
    const country = await RemoveCountry(id);
    return res.status(200).json({ country });
  } catch (error) {
    next(error);
  }
};

export const getAllCities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { countryName } = req.params;
    if (!countryName)
      return next(errorHandler(400, "Please provide country name"));
    // check if the country exists
    const existCountry = await getByCountryName(countryName);
    if (!existCountry) {
      return next(errorHandler(400, "Country not found"));
    }
    const cities = await getCities(countryName);
    return res.status(200).json(cities);
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
    // const locations = await getLocations(countryName, cityName);
    return res.status(200).json(existCity);
  } catch (error) {
    next(error);
  }
};
