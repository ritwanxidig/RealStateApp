import { countryModel } from "../Address";

export const getAllCountries = () => countryModel.find({});
export const getByCountryName = (countryName: string) =>
  countryModel.findOne({ name: { $regex: new RegExp(countryName, "i") } });

export const getCountryById = (countryId: string) =>
  countryModel.findById(countryId);

export const createCountry = (country: Record<string, any>) =>
  countryModel.create(country);

export const updateCountry = (id: string, country: Record<string, any>) =>
  countryModel.findByIdAndUpdate(id, { $set: { ...country } }, { new: true });

export const deleteCountry = (countryId: string) =>
  countryModel.findByIdAndDelete(countryId);
