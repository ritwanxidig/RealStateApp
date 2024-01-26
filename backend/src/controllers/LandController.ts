import { NextFunction, Request, Response } from "express";
import { ILandDDO } from "../interfaces/ILandDDO";
import { get } from "lodash";
import {
  createLand,
  deleteLandById,
  getAll,
  getLandById,
  getSpecificLands,
  updateLandById,
} from "../models/Land";
import { isValidObjectId } from "mongoose";
import { errorHandler, changeToLandInterface } from "../utils";

export const getAllLands = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getAll();

    const lands: ILandDDO[] = await Promise.all(
      data?.map(async (land) => {
        return await changeToLandInterface(land);
      })
    );

    return res.status(200).json(lands);
  } catch (error) {
    next(error);
  }
};

export const getSingleLand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return next(errorHandler(400, "Please provide valid land id"));
    }
    const data = await getLandById(id);
    if (!data) {
      return next(errorHandler(404, "Land not found!"));
    }

    const land = await changeToLandInterface(data);

    return res.status(200).json(land);
  } catch (error) {
    next(error);
  }
};

export const getUserLands = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestedUser = get(req, "identity") as Record<string, any>;
    const data = await getSpecificLands(requestedUser._id.toString());

    const lands: ILandDDO[] = await Promise.all(
      data?.map(async (land) => {
        return await changeToLandInterface(land);
      })
    );

    return res.status(200).json(lands);
  } catch (error) {
    next(error);
  }
};

export const addNewLand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { size, price, address, images } = req.body;
    if (!size || !price || !address || !images)
      return next(errorHandler(400, "Please provide all required fields: size, price, address, images"));

    const requestedUser = get(req, "identity") as Record<string, any>;
    const userRef = requestedUser._id;

    const land = await createLand({ userRef, ...req.body });

    if (!land) return next(errorHandler(400, "land could not be created"));

    return res.status(200).json("land created successfully");
  } catch (error) {
    next(error);
  }
};

export const updateLand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return next(errorHandler(400, "Please provide valid land id"));
    }

    const { size, price, address, images } = req.body;
    if (!size || !price || !address || !images)
      return next(
        errorHandler(
          400,
          "Please provide all required fields: size, price, address, images"
        )
      );

    const land = await getLandById(id);
    if (!land) {
      return next(errorHandler(404, "Land not found!"));
    }

    const updatedLand = await updateLandById(id, req.body);

    if (!updatedLand) {
      return next(errorHandler(400, "Land could not be updated"));
    }
    return res.status(200).json("Land updated successfully");
  } catch (error) {
    next(error);
  }
};

export const deleteLand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return next(errorHandler(400, "Please provide valid land id"));
    }

    const land = await getLandById(id);
    if (!land) {
      return next(errorHandler(404, "Land not found!"));
    }

    const deletedLand = await deleteLandById(id);

    if (!deletedLand) {
      return next(errorHandler(400, "Land could not be deleted"));
    }
    return res.status(200).json("Land deleted successfully");
  } catch (error) {
    next(error);
  }
};
