import express, { NextFunction, Request, Response } from "express";
import {
  getAllCountries as getAllCount,
  getByCountryName,
  createCountry as crateCount,
  createCity,
  getCityByName,
  getCities,
} from "../models/Address";
import { errorHandler } from "../utils";

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
    // check if the city already exists
    const existCity = await getCityByName(countryName, cityName);
    if (existCity) {
      return next(errorHandler(400, "City already exists"));
    }
    // get the country
    const country = await getByCountryName(countryName);
    // check if the country exists
    if (!country) {
      return next(errorHandler(400, "Country not found"));
    }
    const city = await createCity({ name: countryName }, cityName);
    return res.status(200).json(city);
  } catch (error) {
    next(error);
  }
};
