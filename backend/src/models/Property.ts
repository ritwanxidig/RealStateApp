import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrls: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  bed: {
    type: Number,
    required: true,
  },
  bath: {
    type: Number,
    required: true,
  },
  furnished: {
    type: Boolean,
    required: true,
  },
  parking: {
    type: Boolean,
    required: true,
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
});

export const PropertyModel = mongoose.model("Property", propertySchema);

// CRUD for property
export const getAll = () => PropertyModel.find();

export const getById = (id: string) => PropertyModel.findById(id);

export const create = (property: Record<string, any>) =>
  new PropertyModel(property).save();

export const update = (id: string, property: Record<string, any>) =>
  PropertyModel.findByIdAndUpdate(id, property, { new: true });

export const remove = (id: string) => PropertyModel.findByIdAndDelete(id);
