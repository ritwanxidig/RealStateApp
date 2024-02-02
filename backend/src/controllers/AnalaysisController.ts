import express, { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import {
  errorHandler,
  getCityDetails,
  getLatestPropertiesAndLands,
  getPropertiesAnalaysis,
  getTopCities,
  getTopUsers,
  getUserDetails,
} from "../utils";
import { LandModel } from "../models/Land";
import { PropertyModel } from "../models/Property";

// Helper function to get the top 5 users with the most sum of published properties and lands

// Helper function to get user details based on userRef

// Helper function to get the top 3 cities with the most sum of published properties and lands

export default {
  getOverviewAnalaysis: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // geting total number of properties
      const properties = await PropertyModel.find({}).countDocuments();
      // geting total number of lands
      const lands = await LandModel.find({}).countDocuments();

      // getting total revenue from lands
      const revenueFromLands = await LandModel.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$price" },
          },
        },
      ]);
      // getting total revenue from properties
      const revenueFromProperties = await PropertyModel.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$price" },
          },
        },
      ]);

      const totalRevenue =
        revenueFromLands[0].total + revenueFromProperties[0].total;

      // Current monthly revenue of lands and properties
      const currentYear = new Date().getFullYear();

      // Calculating monthly revenue for lands
      const monthlyRevenueLands = await LandModel.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            total: { $sum: "$price" },
          },
        },
      ]);

      // Calculating monthly revenue for properties
      const monthlyRevenueProperties = await PropertyModel.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            total: { $sum: "$price" },
          },
        },
      ]);

      // Creating an array containing 12-letter months with their respective revenue
      const monthlyRevenue = Array.from({ length: 12 }, (_, index) => {
        const month = new Date(currentYear, index, 1)
          .toLocaleString("en-us", { month: "short" })
          .toLowerCase();
        const revenueFromLands = get(
          monthlyRevenueLands.find((item) => item._id === index + 1),
          "total",
          0
        );
        const revenueFromProperties = get(
          monthlyRevenueProperties.find((item) => item._id === index + 1),
          "total",
          0
        );

        return {
          month,
          revenue: {
            lands: revenueFromLands,
            properties: revenueFromProperties,
          },
        };
      });

      // calculating monthly published properties
      const monthlyPublishedProperties = await PropertyModel.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            total: { $sum: 1 },
          },
        },
      ]);

      //   calculating monthly published lands
      const monthlyPublishedLands = await LandModel.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            total: { $sum: 1 },
          },
        },
      ]);

      //   creating an array containing 12-letter months with their respective published properties and lands
      const monthlyPublished = Array.from({ length: 12 }, (_, index) => {
        const month = new Date(currentYear, index, 1)
          .toLocaleString("en-us", { month: "short" })
          .toLowerCase();
        const publishedProperties = get(
          monthlyPublishedProperties.find((item) => item._id === index + 1),
          "total",
          0
        );
        const publishedLands = get(
          monthlyPublishedLands.find((item) => item._id === index + 1),
          "total",
          0
        );
        return {
          month,
          published: {
            properties: publishedProperties,
            lands: publishedLands,
          },
        };
      });

      // Get the top 5 users who published the most properties and lands
      const topUsers = await getTopUsers();

      // Get user details for the top users
      const topUsersDetails = await getUserDetails(topUsers);

      const topCities = await getTopCities();

      const topCitiesDetails = await getCityDetails(topCities);

      const propertyAnalaysis = await getPropertiesAnalaysis();

      const latestListings = await getLatestPropertiesAndLands();

      return res.status(200).json({
        overview: {
          properties,
          lands,
          totalRevenue,
        },
        revenueAnalaysis: {
          revenueFromLands: revenueFromLands[0].total,
          revenueFromProperties: revenueFromProperties[0].total,
        },
        monthlyRevenue,
        monthlyPublished,
        topUsersDetails,
        topCitiesDetails,
        propertyAnalaysis,
        latestListings,
      });
    } catch (error) {
      next(error);
    }
  },
};
