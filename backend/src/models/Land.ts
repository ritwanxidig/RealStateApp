import { timeStamp } from "console";
import mongoose from "mongoose";

export const landSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
    },
    address: {
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
    },

    images: {
      type: [String],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const LandModel = mongoose.model("Land", landSchema);

// CRUD operations for land

export const getAll = () => LandModel.find();

export const getSpecificLands = async (userId: string) => {
  try {
    const lands = await LandModel.find({ userRef: userId });
    return lands;
  } catch (error) {
    throw error;
  }
};

export const createLand = async (landData: Record<string, any>) => {
  try {
    const newLand = await LandModel.create(landData);
    return newLand;
  } catch (error) {
    throw error;
  }
};

export const getLandById = async (landId: string) => {
  try {
    const land = await LandModel.findById(landId);
    return land;
  } catch (error) {
    throw error;
  }
};

export const updateLandById = async (
  landId: string,
  landData: Record<string, any>
) => {
  try {
    const updatedLand = await LandModel.findByIdAndUpdate(landId, landData, {
      new: true,
    });
    return updatedLand;
  } catch (error) {
    throw error;
  }
};

export const deleteLandById = async (landId: string) => {
  try {
    const deletedLand = await LandModel.findByIdAndDelete(landId);
    return deletedLand;
  } catch (error) {
    throw error;
  }
};
