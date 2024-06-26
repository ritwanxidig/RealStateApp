import mongoose, { ObjectId } from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    area: {
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
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const PropertyModel = mongoose.model("Property", propertySchema);

// CRUD for property
export const getAll = () => PropertyModel.find().sort({ createdAt: -1 });

export const getByPropertyId = (id: string) => PropertyModel.findById(id);

export const getUserProperties = (id: ObjectId) =>
  PropertyModel.find({ userRef: id }).sort({ createdAt: -1 });

export const createProperty = (property: Record<string, any>) =>
  new PropertyModel(property).save();

export const updatePropertyById = (id: string, property: Record<string, any>) =>
  PropertyModel.findByIdAndUpdate(id, property, { new: true });

export const removePropertyById = (id: string) =>
  PropertyModel.findByIdAndDelete(id);
