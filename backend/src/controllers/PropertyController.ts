import express, { Request, Response, NextFunction } from "express";
import { PropertyModel, getAll } from "../models/Property";
import { errorHandler } from "../utils";

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
