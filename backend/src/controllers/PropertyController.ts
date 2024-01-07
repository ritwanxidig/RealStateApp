import { Request, Response, NextFunction } from "express";
import {
  PropertyModel,
  createProperty,
  getAll,
  getByPropertyId,
  getUserProperties,
  removePropertyById,
  updatePropertyById,
} from "../models/Property";
import { errorHandler } from "../utils";
import { get } from "lodash";
import { IPropertyDDO } from "../interfaces/IPropertyDDO";
import {
  getCityById,
  getCountryById,
  getLocationById,
} from "../models/Address";
import { getById } from "../models/User";
import { isValidObjectId } from "mongoose";

export const getAllProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getAll();

    const properties = await Promise.all(
      data.map(async (property) => {
        const createdUser = await getById(property.userRef.toString());
        const country = await getCountryById(property.address.country);
        // city holds an object of one country with array of single city:
        //  like {_id: "5f8f6e0e1b7f9c0f1b7f9c0f", name: "kathmandu", cities: [{ _id: "5f8f6e0e1b7f9c0f1b7f9c0f", name: "kathmandu", locations: [{ _id: "5f8f6e0e1b7f9c0f1b7f9c0f", name: "kathmandu" }] }]}
        const city = await getCityById(
          property.address.city,
          property.address.country
        );

        // location is same as city.locations[0]
        const location = await getLocationById(
          property.address.country,
          property.address.city,
          property.address.location
        );
        const propertyDDO: IPropertyDDO = {
          _id: property._id.toString(),
          _createdAt: property.createdAt,
          _updatedAt: property.updatedAt,
          name: property?.name,
          description: property.description,
          price: property.price,
          discount: property.discount,
          imageUrls: property.imageUrls,
          type: property.type,
          beds: property.beds,
          baths: property.baths,
          furnished: property.furnished,
          parking: property.parking,
          area: property.area,
          address: {
            country: country.name,
            city: city.cities[0].name,
            location: location?.cities[0]?.locations[0]?.name,
          },
          user: {
            name: createdUser?.name,
            username: createdUser?.username,
            email: createdUser?.email,
            roles: createdUser?.roles,
          },
        };
        return propertyDDO;
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
    const property = await getByPropertyId(id);
    if (!property) return next(errorHandler(400, "property not found"));
    const owner = await getById(property.userRef.toString());
    const country = await getCountryById(property.address.country);
    const city = await getCityById(
      property.address.city,
      property.address.country
    );
    const location = await getLocationById(
      property.address.country,
      property.address.city,
      property.address.location
    );

    return res.status(200).json(property);
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

    console.log("countryId: ", countryId);
    console.log("cityId: ", cityId);
    console.log("type: ", type);

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
    });
    const properties = await Promise.all(
      data.map(async (property) => {
        const createdUser = await getById(property.userRef.toString());
        const country = await getCountryById(property.address.country);
        const city = await getCityById(
          property.address.city,
          property.address.country
        );
        const location = await getLocationById(
          property.address.country,
          property.address.city,
          property.address.location
        );
        const propertyDDO: IPropertyDDO = {
          _id: property._id.toString(),
          _createdAt: property.createdAt,
          _updatedAt: property.updatedAt,
          name: property?.name,
          description: property.description,
          price: property.price,
          discount: property.discount,
          imageUrls: property.imageUrls,
          type: property.type,
          beds: property.beds,
          baths: property.baths,
          furnished: property.furnished,
          parking: property.parking,
          area: property.area,
          address: {
            country: country.name,
            city: city.cities[0].name,
            location: location?.cities[0]?.locations[0]?.name,
          },
          user: {
            name: createdUser?.name,
            username: createdUser?.username,
            email: createdUser?.email,
            roles: createdUser?.roles,
          },
        };
        return propertyDDO;
      })
    );

    console.log(data);

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
    console.log(requestedUser);
    const data = await getUserProperties(requestedUser._id);

    const properties = await Promise.all(
      data.map(async (property) => {
        const createdUser = await getById(property.userRef.toString());
        const country = await getCountryById(property.address.country);
        // city holds an object of one country with array of single city:
        //  like {_id: "5f8f6e0e1b7f9c0f1b7f9c0f", name: "kathmandu", cities: [{ _id: "5f8f6e0e1b7f9c0f1b7f9c0f", name: "kathmandu", locations: [{ _id: "5f8f6e0e1b7f9c0f1b7f9c0f", name: "kathmandu" }] }]}
        const city = await getCityById(
          property.address.city,
          property.address.country
        );

        // location is same as city.locations[0]
        const location = await getLocationById(
          property.address.country,
          property.address.city,
          property.address.location
        );
        const propertyDDO: IPropertyDDO = {
          _id: property._id.toString(),
          _createdAt: property.createdAt,
          _updatedAt: property.updatedAt,
          name: property?.name,
          description: property.description,
          price: property.price,
          discount: property.discount,
          imageUrls: property.imageUrls,
          type: property.type,
          beds: property.beds,
          baths: property.baths,
          furnished: property.furnished,
          parking: property.parking,
          area: property.area,
          address: {
            country: country.name,
            city: city.cities[0].name,
            location: location?.cities[0]?.locations[0]?.name,
          },
          user: {
            name: createdUser?.name,
            username: createdUser?.username,
            email: createdUser?.email,
            roles: createdUser?.roles,
          },
        };
        return propertyDDO;
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
    const propertyDDO: IPropertyDDO = {
      _id: property._id.toString(),
      _createdAt: property.createdAt,
      _updatedAt: property.updatedAt,
      name: property.name,
      description: property.description,
      price: property.price,
      discount: property.discount,
      imageUrls: property.imageUrls,
      type: property.type,
      beds: property.beds,
      baths: property.baths,
      furnished: property.furnished,
      parking: property.parking,
      area: property.area,
      address: {
        country: country.name,
        city: city.cities[0].name,
        location: location.cities[0].locations[0].name,
      },
      user: {
        name: loggedInUser.name,
        username: loggedInUser.username,
        email: loggedInUser.email,
        roles: loggedInUser.roles,
      },
    };

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
