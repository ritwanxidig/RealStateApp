import { countryModel } from "../Address";

export const getCities = (countryId: string) =>
  countryModel.findOne({ _id: countryId }).select("cities");

export const getCityByName = async (countryId: string, cityName: string) => {
  try {
    const country = await countryModel.findById(countryId);
    const result = country.cities.find(
      (city) => city.name.toLowerCase() === cityName.toLowerCase()
    );
    return result;
  } catch (error) {
    // Handle the error appropriately, e.g., log it or throw a custom error.
    console.error("Error in getCityByName:", error);
    throw error;
  }
};

export const createCity = async (
  country: Record<string, any>,
  name: string
) => {
  const targetCountry = await countryModel.findOne({ _id: country.id });
  targetCountry.cities.push({ name });
  return targetCountry.save();
};

export const updateCity = async (
  cityId: string,
  countryId: string,
  updatedName: string
) => {
  const country = await countryModel.findById(countryId);
  country.cities.id(cityId).name = updatedName;
  return country.save();
};

export const removeCity = async (cityId: string, countryId: string) => {
  const country = await countryModel.findById(countryId);
  country.cities.id(cityId).deleteOne();
  return country.save();
};

export const getCityById = async (cityId: string, countryId: string) => {
  const country = await countryModel.findById(countryId);
  const city = country.cities.id(cityId);
  return city;
};
