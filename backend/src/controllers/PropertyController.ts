import express, { Request, Response, NextFunction } from "express";
import { PropertyModel, create, getAll } from "../models/Property";
import { errorHandler } from "../utils";
import { get, identity } from "lodash";

export const getAllProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const properties = await getAll();
    return res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

export const createProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, price, imageUrls, type, beds, baths, address } = req.body;
  if (!name || !price || !imageUrls || !type || !beds || !baths || !address)
    return next(
      errorHandler(
        400,
        "please provide all essentail fields: name, price, imageUrls, type, beds, baths, address "
      )
    );
  try {
    const loggedInUser = get(req, "identity") as Record<string, any>;
    const userRef = loggedInUser._id;
    const property = await create({ userRef, ...req.body });
    return res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};
