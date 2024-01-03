import express, { NextFunction, Request, Response } from "express";
import {
  getAllCountries as getAllCount,
  getByCountryName,
  createCountry as crateCount,
  createCity,
  getCityByName,
  getCities,
  updateCountry as EditCountry,
  deleteCountry as RemoveCountry,
  getLocations,
  addLocation,
  getLocationByName,
  updateLocation,
  getLocationById,
  deleteLocation,
} from "../models/Address";
import { errorHandler } from "../utils/index";
import mongoose from "mongoose";

export * from "./Address/CountryController";
export * from "./Address/CityController";
export * from "./Address/LocationController";
