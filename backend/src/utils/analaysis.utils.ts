import { get } from "lodash";
import { UserModel, getById as getUserById } from "../models/User";
import { countryModel } from "../models/Address";
import { NextFunction, Request, Response } from "express";
import { PropertyModel } from "../models/Property";
import { LandModel } from "../models/Land";
import { CityDetail, UserDetail } from "interfaces";

export const getTopUsers = async (): Promise<
  Map<string, { properties?: number; lands?: number }>
> => {
  const topUsers = await UserModel.aggregate([
    {
      $lookup: {
        from: "properties", // Assuming the name of the properties collection
        localField: "_id",
        foreignField: "userRef",
        as: "properties",
      },
    },
    {
      $lookup: {
        from: "lands", // Assuming the name of the lands collection
        localField: "_id",
        foreignField: "userRef",
        as: "lands",
      },
    },
    {
      $addFields: {
        totalProperties: { $size: "$properties" },
        totalLands: { $size: "$lands" },
        revenue: {
          $sum: [{ $sum: "$properties.price" }, { $sum: "$lands.price" }],
        },
      },
    },
    {
      $sort: { totalProperties: -1, totalLands: -1 },
    },
    {
      $limit: 5,
    },
    {
      $project: {
        _id: 1,
        properties: "$totalProperties",
        lands: "$totalLands",
        revenue: "$revenue",
      },
    },
  ]);

  const combinedUsers = new Map<
    string,
    { properties?: number; lands?: number; revenue?: number }
  >();
  topUsers.forEach((user: Record<string, any>) => {
    combinedUsers.set(user._id, {
      properties: user.properties || 0,
      lands: user.lands || 0,
      revenue: user.revenue || 0,
    });
  });

  return combinedUsers;
};

export const getUserDetails = async (
  topUsers: Map<
    string,
    { properties?: number; lands?: number; revenue?: number }
  >
): Promise<UserDetail[]> => {
  const userDetailsPromises = Array.from(topUsers.keys()).map(
    async (userId) => {
      const userDetail = await getUserById(userId);
      return {
        name: userDetail.name, // Assuming there is a 'name' field in the User model
        properties: get(topUsers.get(userId), "properties", 0),
        lands: get(topUsers.get(userId), "lands", 0),
        revenue: get(topUsers.get(userId), "revenue", 0),
      };
    }
  );

  return Promise.all(userDetailsPromises);
};

export const getTopCities = async (): Promise<
  Map<string, { properties?: number; lands?: number; revenue: number }>
> => {
  const topCities = await countryModel.aggregate([
    {
      $unwind: "$cities",
    },
    {
      $unwind: "$cities.locations",
    },
    {
      $lookup: {
        from: "lands", // Assuming the name of the lands collection
        localField: "cities.locations._id",
        foreignField: "address.city",
        as: "lands",
      },
    },
    {
      $lookup: {
        from: "properties", // Assuming the name of the properties collection
        localField: "cities.locations._id",
        foreignField: "address.city",
        as: "properties",
      },
    },
    {
      $addFields: {
        totalProperties: { $size: "$properties" },
        totalLands: { $size: "$lands" },
        revenue: {
          $sum: [{ $sum: "$properties.price" }, { $sum: "$lands.price" }],
        },
      },
    },
    {
      $sort: { totalProperties: -1, totalLands: -1 },
    },
    {
      $limit: 3,
    },
    {
      $project: {
        _id: 0,
        city: "$cities.name",
        totalProperties: 1,
        totalLands: 1,
        revenue: 1,
      },
    },
  ]);

  const combinedCities = new Map<
    string,
    { properties?: number; lands?: number; revenue: number }
  >();
  topCities.forEach((city: Record<string, any>) => {
    combinedCities.set(city.city, {
      properties: city.totalProperties || 0,
      lands: city.totalLands || 0,
      revenue: city.revenue || 0,
    });
  });

  return combinedCities;
};

export const getCityDetails = async (
  topCities: Map<
    string,
    { properties?: number; lands?: number; revenue: number }
  >
): Promise<CityDetail[]> => {
  const cityDetailsPromises = Array.from(topCities.keys()).map(async (city) => {
    // const cityDetail = await getCityById(city);
    return {
      name: city,
      properties: get(topCities.get(city), "properties", 0),
      lands: get(topCities.get(city), "lands", 0),
      revenue: get(topCities.get(city), "revenue", 0),
    };
  });

  return Promise.all(cityDetailsPromises);
};

export const getPropertiesAnalaysis = async () => {
  const properties = await PropertyModel.aggregate([
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
      },
    },
  ]);
  return properties;
};

// top 4 latest published properties and lands
export const getLatestPropertiesAndLands = async () => {
  const latestProperties = await PropertyModel.find({})
    .sort({ createdAt: -1 })
    .limit(4);

  const latestLands = await LandModel.find({}).sort({ createdAt: -1 }).limit(4);

  const combinedArray = [...latestProperties, ...latestLands];

  const latestListings = combinedArray
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 4) as Array<Record<string, any>>;

  // returning array of {type: property/land, _id, createdAt, price, address, image}
  const formattedListings = latestListings.map((listing) => {
    const type = listing.baths ? "property" : "land";
    return {
      type,
      _id: listing._id,
      createdAt: listing.createdAt,
      price: listing.price,
      address: listing.address,
      image: type === "land" ? listing.images[0] : listing.imageUrls[0],
    };
  });

  return formattedListings;
};
