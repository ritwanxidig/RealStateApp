import express, { Request, Response, NextFunction } from "express";
import { PropertyModel, create, getAll } from "../models/Property";
import { errorHandler } from "../utils";
import { get, identity } from "lodash";
import { IPropertyDDO } from "../interfaces/IPropertyDDO";
import {
  getCityById,
  getCountryById,
  getLocationById,
} from "../models/Address";
import { getById } from "../models/User";
import { ObjectId } from "mongoose";

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
        const city = await getCityById(property.address.city, country.name);

        // location is same as city.locations[0]
        const location = await getLocationById(
          country.name,
          city.name,
          property.address.location
        );
        const propertyDDO: IPropertyDDO = {
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
          offer: property.offer,
          area: property.area,
          address: {
            country: country.name,
            city: city.cities[0].name,
            location: location.cities[0].locations[0].name,
          },
          user: {
            name: createdUser.name,
            username: createdUser.username,
            email: createdUser.email,
            roles: createdUser.roles,
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
      offer: property.offer,
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

    return res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};
