import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { LandModel } from "../../models/Land";
import { PropertyModel } from "../../models/Property";
import {
  getLatestListings,
  getMonthAnalaysisPublished,
  getMonthlyAnalaysisRevenue,
  getPropertyAnalaysis,
} from "../../utils/userAnalaysis.utils";

export const UserAnalaysisController = {
  getUserAnalaysis: async (req: Request, res: Response, next: NextFunction) => {
    const requestedUser = get(req, "identity") as Record<string, any>;
    const userRef = requestedUser._id;

    const lands = await LandModel.find({ userRef });
    const revenuFromLands = await LandModel.aggregate([
      {
        $match: {
          userRef,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]);

    const properties = await PropertyModel.find({ userRef });
    const revenueFromProperties = await PropertyModel.aggregate([
      {
        $match: {
          userRef,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]);

    const totalRevenue =
      revenuFromLands[0].total + revenueFromProperties[0].total;

    const currentYear = new Date().getFullYear();

    const monthlyRevenue = await getMonthlyAnalaysisRevenue(userRef);
    const monthlyPublished = await getMonthAnalaysisPublished(userRef);
    const propertyAnalaysis = await getPropertyAnalaysis(userRef);
    const latestListings = await getLatestListings(userRef);

    return res.status(200).json({
      overview: {
        lands: lands.length,
        properties: properties.length,
        totalRevenue,
      },
      revenueAnalaysis: {
        revenueFromProperties: revenueFromProperties[0].total,
        revenueFromLands: revenuFromLands[0].total,
        totalRevenue,
      },
      monthlyRevenue,
      monthlyPublished,
      propertyAnalaysis,
      latestListings,
    });
  },
};
