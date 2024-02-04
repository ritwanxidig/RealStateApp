import { PropertyModel } from "../models/Property";
import { LandModel } from "../models/Land";
import { getById as getUserById } from "../models/User";
import { get } from "lodash";
import { getCityById, getCountryById } from "../models/Address";

export const getMonthlyAnalaysisRevenue = async (userRef: string) => {
  const currentYear = new Date().getFullYear();
  // monthly revenu
  const monthlyRevenuFromLands = await LandModel.aggregate([
    {
      $match: {
        userRef,
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        total: { $sum: "$price" },
      },
    },
  ]);

  const monthlyRevenuFromProperties = await PropertyModel.aggregate([
    {
      $match: {
        userRef,
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        total: { $sum: "$price" },
      },
    },
  ]);

  const monthlyRevenue = Array.from({ length: 12 }, (_, index) => {
    const month = new Date(currentYear, index, 1)
      .toLocaleString("en-us", { month: "short" })
      .toLowerCase();
    const revenueFromLands = get(
      monthlyRevenuFromLands.find((item) => item._id === index + 1),
      "total",
      0
    );
    const revenueFromProperties = get(
      monthlyRevenuFromProperties.find((item) => item._id === index + 1),
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

  return monthlyRevenue;
};

export const getMonthAnalaysisPublished = async (userRef: string) => {
  const currentYear = new Date().getFullYear();
  const monthlyPublishedLands = await LandModel.aggregate([
    {
      $match: {
        userRef,
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        total: { $sum: 1 },
      },
    },
  ]);
  const monthlyPublishedProperties = await PropertyModel.aggregate([
    {
      $match: {
        userRef,
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        total: { $sum: 1 },
      },
    },
  ]);

  const monthlyPublished = Array.from({ length: 12 }, (_, index) => {
    const month = new Date(currentYear, index, 1)
      .toLocaleString("en-us", { month: "short" })
      .toLowerCase();
    const publishedLands = get(
      monthlyPublishedLands.find((item) => item._id === index + 1),
      "total",
      0
    );
    const publishedProperties = get(
      monthlyPublishedProperties.find((item) => item._id === index + 1),
      "total",
      0
    );
    return {
      month,
      published: {
        lands: publishedLands,
        properties: publishedProperties,
      },
    };
  });

  return monthlyPublished;
};

export const getPropertyAnalaysis = async (userRef: string) => {
  const propertiesAnalaysis = await PropertyModel.aggregate([
    {
      $match: {
        userRef,
      },
    },
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
      },
    },
  ]);

  return propertiesAnalaysis;
};

export const getLatestListings = async (userRef: string) => {
  const properties = await PropertyModel.find({ userRef })
    .sort({ createdAt: -1 })
    .limit(5);
  const lands = await LandModel.find({ userRef })
    .sort({ createdAt: -1 })
    .limit(5);

  const combined = [...properties, ...lands];
  const latestListings = combined
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5) as Array<Record<string, any>>;
  const formattedListings = await Promise.all(
    latestListings.map(async (listing) => {
      const type = listing?.baths ? "property" : "land";
      const country = await getCountryById(listing.address.country);
      const city = await getCityById(
        listing.address.city,
        listing.address.country
      );
      const location = `${country.name}, ${city.name}`;
      const owner = await getUserById(listing.userRef.toString());
      return {
        type,
        _id: listing._id,
        createdAt: listing.createdAt,
        price: listing.price,
        location,
        owner,
        address: listing.address,
        image: type === "land" ? listing.images[0] : listing.imageUrls[0],
      };
    })
  );

  return formattedListings;
};
