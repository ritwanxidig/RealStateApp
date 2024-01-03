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
export const getCities = (countryId: string) =>
  countryModel.findOne({ _id: countryId }).select("cities");

export const getCityByName = async (countryId: string, cityName: string) => {
  try {
    const result = await countryModel
      .findOne({
        _id: countryId,
        "cities.name": { $regex: new RegExp(cityName, "i") },
      })
      .select("cities");

    return result;
  } catch (error) {
    // Handle the error appropriately, e.g., log it or throw a custom error.
    console.error("Error in getCityByName:", error);
    throw error;
  }
};
// 3. get all locations of a specific city of a country
export const getLocations = (countryId: string, cityId: string) =>
  countryModel
    .findOne({
      _id: countryId,
      "cities._id": cityId,
    })
    .select("cities.locations.$");

// 4. add specific country
export const createCountry = (country: Record<string, any>) =>
  countryModel.create(country);

export const updateCountry = (id: string, country: Record<string, any>) =>
  countryModel.findByIdAndUpdate(id, { $set: { ...country } }, { new: true });

// 5. add specific city to a country
export const createCity = (country: Record<string, any>, name: string) =>
  countryModel.findOneAndUpdate(
    { _id: country.id },
    { $push: { cities: { name } } },
    { new: true }
  );

export const updateCity = (
  cityId: string,
  countryId: string,
  updatedName: string
) =>
  countryModel
    .findOneAndUpdate(
      { _id: countryId, "cities._id": cityId },
      { $set: { "cities.$.name": updatedName } },
      { new: true }
    )
    .select("cities");

export const removeCity = (cityId: string, countryId: string) =>
  countryModel.findOneAndUpdate(
    { _id: countryId },
    { $pull: { cities: { _id: cityId } } },
    { new: true }
  );

export const getCityById = (cityId: string, countryId: string) =>
  countryModel
    .findOne({ _id: countryId, "cities._id": cityId })
    .select("cities.$");

// export const getAllLocations = (country: string, city: string) =>
//   countryModel
//     .findOne({
//       name: { $regex: new RegExp(country, "i") },
//       "cities.name": { $regex: new RegExp(city, "i") },
//     })
//     .select("cities.locations");

export const getLocationByName = (
  countryId: string,
  cityId: string,
  location: string
) =>
  countryModel
    .findOne({
      _id: countryId,
      "cities._id": cityId,
      "cities.locations.name": { $regex: new RegExp(location, "i") },
    })
    .select("cities.locations.$");

export const getLocationById = async (
  countryId: string,
  cityId: string,
  locationId: string
) => {
  try {
    return await countryModel
      .findOne({
        _id: countryId,
        "cities._id": cityId,
        "cities.locations._id": locationId,
      })
      .select("cities.locations.$");
  } catch (error) {
    console.log("Error in getLocationById:", error);
    throw error;
  }
};

export const addLocation = async (
  countryId: string,
  cityId: string,
  locationName: string
) => {
  try {
    const result = await countryModel
      .findOneAndUpdate(
        {
          _id: countryId,
          "cities._id": cityId,
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
  countryId: string,
  cityId: string,
  updatedName: string
) => {
  try {
    return await countryModel
      .findOneAndUpdate(
        {
          _id: countryId,
          "cities._id": cityId,
          "cities.locations._id": locationId,
        },
        {
          $set: { "cities.$[outer].locations.$[inner].name": updatedName },  /// Re-Read: what is the meaning of this line?
        },
        {
          arrayFilters: [
            { "outer._id": cityId },
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
  countryId: string,
  cityId: string
) => {
  try {
    return await countryModel
      .findOneAndUpdate(
        {
          _id: countryId,
          "cities._id": cityId,
        },
        {
          $pull: { "cities.$.locations": { _id: locationId } },
        },
        { new: true }
      )
      .select("cities.locations.$");
  } catch (error) {
    console.error("Error in deleteLocation:", error);
    throw error;
  }
};
