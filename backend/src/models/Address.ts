import express from "express";
import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: String,
  cities: {
    type: [{ name: String, locations: [{ name: String }] }],
    required: true,
  },
});

export const countryModel = mongoose.model("Country", countrySchema);

// 1. get all  countries
export const getAllCountries = () => countryModel.find({});
export const getByCountryName = (countryName: string) =>
  countryModel.findOne({ name: { $regex: new RegExp(countryName, "i") } });

// 2. get all cities of a country
export const getCities = (countryName: string) =>
  countryModel
    .findOne({ name: { $regex: new RegExp(countryName, "i") } })
    .select("cities");
export const getCityByName = (countryName: string, cityName: string) =>
  countryModel
    .findOne({ name: { $regex: new RegExp(countryName, "i") } })
    .select("cities")
    .where("cities.name", { $regex: new RegExp(cityName, "i") });

// 3. get all locations of a specific city of a country
export const getLocations = (country: string, city: string) =>
  countryModel
    .find({
      name: { $regex: new RegExp(country, "i") },
      "cities.name": { $regex: new RegExp(city, "i") },
    })
    .select("cities.locations");

export const getLocationByName = (
  country: string,
  city: string,
  location: string
) =>
  countryModel
    .find({
      name: { $regex: new RegExp(country, "i") },
      "cities.name": { $regex: new RegExp(city, "i") },
    })
    .select("cities.locations")
    .where("cities.locations.name", { $regex: new RegExp(location, "i") });

// 4. add specific country
export const createCountry = (country: Record<string, any>) =>
  countryModel.create(country);

// 5. add specific city to a country
export const createCity = (country: Record<string, any>, name: string) =>
  countryModel.findOneAndUpdate(
    { name: country.name },
    { $push: { cities: { name } } }
  );

// 6. add specific location to a city of a country
export const addLocation = async (
  country: string,
  city: string,
  location: string
) => {
  try {
    const result = await countryModel.findOneAndUpdate(
      { name: country, "cities.name": city },
      { $push: { "cities.$.locations": { name: location } } }
    );
    return result;
  } catch (error) {
    throw error;
  }
};
