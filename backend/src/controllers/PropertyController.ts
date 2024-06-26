import { isValidObjectId } from "mongoose";
import { Request, Response, NextFunction } from "express";

// for project
import {
  PropertyModel,
  createProperty,
  getAll,
  getByPropertyId,
  getUserProperties,
  removePropertyById,
  updatePropertyById,
} from "../models/Property";
import { changeToPropertyInterface, errorHandler } from "../utils";
import { get } from "lodash";
import { IPropertyDDO } from "../interfaces/IPropertyDDO";
import {
  getCityById,
  getCountryById,
  getLocationById,
} from "../models/Address";

export const getAllProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getAll();

    const properties = await Promise.all(
      data.map(async (property) => {
        return await changeToPropertyInterface(property);
      })
    );
    // const actualData = await properties;

    return res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

export const getProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id))
      return next(errorHandler(400, "please insert valid objectId"));
    const property = (await getByPropertyId(id)) as Record<string, any>;
    if (!property) return next(errorHandler(400, "property not found"));

    const propertyDDO = await changeToPropertyInterface(property);

    return res.status(200).json({
      row: property,
      structured: propertyDDO,
    });
  } catch (error) {
    next(error);
  }
};

export const searchProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let countryId = req.query.countryId || ""; // assuming countryId is sent as country
    let cityId = req.query.cityId || "";
    let type = req.query.type;

    // Handle empty countryId and cityId
    const countryCondition = countryId
      ? { $in: [countryId] }
      : { $exists: true };
    const cityCondition = cityId ? { $eq: cityId } : { $exists: true };

    if (type === undefined || type === "all") {
      type = { $in: ["rent", "sale"] };
    }

    const data = await PropertyModel.find({
      "address.country": countryCondition,
      "address.city": cityCondition,
      type: type,
    }).sort({ createdAt: -1 });
    const properties = await Promise.all(
      data.map(async (property) => {
        return await changeToPropertyInterface(property);
      })
    );

    return res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

export const getMyProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestedUser = get(req, "identity") as Record<string, any>;
    const data = await getUserProperties(requestedUser._id);

    const properties = await Promise.all(
      data.map(async (property) => {
        return await changeToPropertyInterface(property);
      })
    );

    return res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

export const addProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { price, imageUrls, type, beds, baths, address } = req.body;
  if (!price || !imageUrls || !type || !beds || !baths || !address)
    return next(
      errorHandler(
        400,
        "please provide all essentail fields:  price, imageUrls, type, beds, baths, address "
      )
    );
  try {
    const loggedInUser = get(req, "identity") as Record<string, any>;
    const userRef = loggedInUser._id;
    const property = await createProperty({ userRef, ...req.body });

    if (!property) {
      return next(errorHandler(400, "Property not created"));
    }

    const country = await getCountryById(address.country);
    const city = await getCityById(address.city, address.country);
    const location = await getLocationById(
      address.country,
      address.city,
      address.location
    );
    const propertyDDO = await changeToPropertyInterface(property);

    return res.status(200).json(propertyDDO);
  } catch (error) {
    next(error);
  }
};

export const editProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    if (!isValidObjectId(id))
      return next(errorHandler(400, "please insert valid objectId"));
    // check if the property with id exists
    const targetOne = await getByPropertyId(id);
    if (!targetOne)
      return next(errorHandler(400, "this property does not exist"));

    // check if the user is owner
    const requestedUser = get(req, "identity") as Record<string, any>;
    if (
      requestedUser._id.toString() !== targetOne.userRef.toString() &&
      !requestedUser.roles.includes("admin")
    )
      return next(
        errorHandler(403, "you can't edit this, b/c you are not the owner")
      );

    // update all the other data except the createdUser
    const toUpdateData = { userRef: targetOne.userRef, ...payload };
    const updatedData = await updatePropertyById(id, toUpdateData);
    if (!updatedData)
      return next(
        errorHandler(400, "something went wrong in propertyController line 171")
      );

    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    // get the requested user
    const requestedUser = get(req, "identity") as Record<string, any>;

    // check if the id is valid objectID
    if (!isValidObjectId(id))
      return next(errorHandler(400, "please insert valid Id"));

    // get the target document
    const targetOne = await getByPropertyId(id);

    // check if the document exists before
    if (!targetOne)
      return next(errorHandler(400, "this property does not exist"));

    // check if the requested is the owner of this document or admin
    if (
      requestedUser._id.toString() !== targetOne.userRef.toString() &&
      !requestedUser.roles.includes("admin")
    )
      return next(
        errorHandler(403, "you can't delete this, b/c you are not the owner")
      );
    //  then, delete
    await removePropertyById(id);
    return res.status(200).json("property successfully deleted");
  } catch (error) {
    next(error);
  }
};
