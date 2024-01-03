import { NextFunction, Request, Response } from "express";
import {
  getAllCountries as getAllCount,
  getByCountryName,
  createCountry as crateCount,
  updateCountry as EditCountry,
  deleteCountry as RemoveCountry,
  getCountryById,
} from "../../models/Address";
import { errorHandler } from "../../utils/index";

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

export const getSingleCountry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const country = await getCountryById(id);
    return res.status(200).json(country);
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
