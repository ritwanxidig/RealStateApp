import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cities: [
    {
      name: {
        type: String,
        required: true,
      },
      locations: [
        {
          name: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

export const countryModel = mongoose.model("Country", countrySchema);

// 1. get all  countries
export * from "./Addresses/Country";
export * from "./Addresses/City";
export * from "./Addresses/Location";
