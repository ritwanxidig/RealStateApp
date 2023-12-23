import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: String,
  cities: {
    type: [{ name: String, locations: { type: [{ name: String }] } }],
    required: true,
  },
});

export const countryModel = mongoose.model("Country", countrySchema);

// 1. get all  countries
export const getAllCountries = () => countryModel.find({});
export const getByCountryName = (countryName: string) =>
  countryModel.findOne({ name: { $regex: new RegExp(countryName, "i") } });

export const getCountryById = (countryId: string) =>
  countryModel.findById(countryId);

export const deleteCountry = (countryId: string) =>
  countryModel.findByIdAndDelete(countryId);

// 2. get all cities of a country
export const getCities = (countryName: string) =>
  countryModel
    .findOne({ name: { $regex: new RegExp(countryName, "i") } })
    .select("cities");

export const getCityByName = (countryName: string, cityName: string) =>
  countryModel
    .find({
      name: { $regex: new RegExp(countryName, "i") },
      "cities.name": { $regex: new RegExp(cityName, "i") },
    })
    .select("cities.$");
// 3. get all locations of a specific city of a country
export const getLocations = (country: string, city: string) =>
  countryModel
    .findOne({
      name: { $regex: new RegExp(country, "i") },
      "cities.name": { $regex: new RegExp(city, "i") },
    })
    .select("cities.locations");

// 4. add specific country
export const createCountry = (country: Record<string, any>) =>
  countryModel.create(country);

export const updateCountry = (id: string, country: Record<string, any>) =>
  countryModel.findByIdAndUpdate(id, { $set: { ...country } }, { new: true });

// 5. add specific city to a country
export const createCity = (country: Record<string, any>, name: string) =>
  countryModel.findOneAndUpdate(
    { name: country.name },
    { $push: { cities: { name } } },
    { new: true }
  );

export const updateCity = (
  cityId: string,
  country: string,
  updatedName: string
) =>
  countryModel
    .findOneAndUpdate(
      { name: { $regex: new RegExp(country, "i") }, "cities._id": cityId },
      { $set: { "cities.$.name": updatedName } },
      { new: true }
    )
    .select("cities");

export const removeCity = (cityId: string, country: string) =>
  countryModel.findOneAndUpdate(
    { name: { $regex: new RegExp(country, "i") } },
    { $pull: { cities: { _id: cityId } } },
    { new: true }
  );

export const getCityById = (cityId: string, country: string) =>
  countryModel
    .find({ name: { $regex: new RegExp(country, "i") }, "cities._id": cityId })
    .select("cities.$");

// export const getAllLocations = (country: string, city: string) =>
//   countryModel
//     .findOne({
//       name: { $regex: new RegExp(country, "i") },
//       "cities.name": { $regex: new RegExp(city, "i") },
//     })
//     .select("cities.locations");

export const getLocationByName = (
  country: string,
  city: string,
  location: string
) =>
  countryModel
    .findOne({
      name: { $regex: new RegExp(country, "i") },
      "cities.name": { $regex: new RegExp(city, "i") },
      "cities.locations.name": { $regex: new RegExp(location, "i") },
    })
    .select("cities.locations.$");

export const getLocationById = (
  country: string,
  city: string,
  locationId: string
) =>
  countryModel
    .findOne({
      name: { $regex: new RegExp(country, "i") },
      "cities.name": { $regex: new RegExp(city, "i") },
      "cities.locations._id": locationId,
    })
    .select("cities.locations.$");

export const addLocation = async (
  country: string,
  city: string,
  locationName: string
) => {
  try {
    const result = await countryModel
      .findOneAndUpdate(
        {
          name: { $regex: new RegExp(country, "i") },
          "cities.name": { $regex: new RegExp(city, "i") },
        },
        { $push: { "cities.$.locations": { name: locationName } } },
        { new: true }
      )
      .select("cities.locations");

    return result;
  } catch (error) {
    console.error("Error in addLocation:", error);
    throw error;
  }
};

// create function to update specific location
export const updateLocation = async (
  locationId: string,
  country: string,
  city: string,
  updatedName: string
) => {
  try {
    return await countryModel
      .findOneAndUpdate(
        {
          name: { $regex: new RegExp(country, "i") },
          "cities.name": { $regex: new RegExp(city, "i") },
          "cities.locations._id": locationId,
        },
        {
          $set: { "cities.$[outer].locations.$[inner].name": updatedName },
        },
        {
          arrayFilters: [
            { "outer.name": { $regex: new RegExp(city, "i") } },
            { "inner._id": locationId },
          ],
          new: true,
        }
      )
      .select("cities.locations");
  } catch (error) {
    console.error("Error in updateLocation:", error);
    throw error;
  }
};

export const deleteLocation = async (
  locationId: string,
  country: string,
  city: string
) => {
  try {
    return await countryModel
      .findOneAndUpdate(
        {
          name: { $regex: new RegExp(country, "i") },
          "cities.name": { $regex: new RegExp(city, "i") },
        },
        { $pull: { "cities.locations": { _id: locationId } } },
        { new: true }
      )
      .select("cities.locations");
  } catch (error) {
    console.error("Error in deleteLocation:", error);
    throw error;
  }
};
