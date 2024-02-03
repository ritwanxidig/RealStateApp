import { countryModel } from "../Address";

export const getLocations = async (countryId: string, cityId: string) => {
  const country = await countryModel.findById(countryId);
  const city = country.cities.id(cityId);
  return city.locations;
};

export const getLocationByName = async (
  countryId: string,
  cityId: string,
  location: string
) => {
  const country = await countryModel.findById(countryId);
  const city = country.cities.id(cityId);
  const result = city.locations.find(
    (loc) => loc.name.toLowerCase() === location.toLowerCase()
  );
  return result;
};

export const getLocationById = async (
  countryId: string,
  cityId: string,
  locationId: string
) => {
  try {
    const country = await countryModel.findById(countryId);
    const city = country.cities.id(cityId);
    const location = city.locations.id(locationId);
    return location;
  } catch (error) {
    console.log("Error in getLocationById:", error);
    throw error;
  }
};

export const addLocation = async (
  countryId: string,
  cityId: string,
  locationName: string
) => {
  try {
    const country = await countryModel.findById(countryId);
    const city = country.cities.id(cityId);
    const updatedLocation = city.locations.push({ name: locationName });

    const result = await country.save();

    return result;
  } catch (error) {
    console.error("Error in addLocation:", error);
    throw error;
  }
};

// create function to update specific location
export const updateLocation = async (
  locationId: string,
  countryId: string,
  cityId: string,
  updatedName: string
) => {
  try {
    const country = await countryModel.findById(countryId);
    const city = country.cities.id(cityId);
    const location = city.locations.id(locationId);
    location.name = updatedName;

    const result = await country.save();
    return result;
    // return await countryModel
    //   .findOneAndUpdate(
    //     {
    //       _id: countryId,
    //       "cities._id": cityId,
    //       "cities.locations._id": locationId,
    //     },
    //     {
    //       $set: { "cities.$[outer].locations.$[inner].name": updatedName }, /// Re-Read: what is the meaning of this line?
    //     },
    //     {
    //       arrayFilters: [{ "outer._id": cityId }, { "inner._id": locationId }],
    //       new: true,
    //     }
    //   )
    //   .select("cities.locations");
  } catch (error) {
    console.error("Error in updateLocation:", error);
    throw error;
  }
};

export const deleteLocation = async (
  locationId: string,
  countryId: string,
  cityId: string
) => {
  try {
    const country = await countryModel.findById(countryId);
    const city = country.cities.id(cityId);
    city.locations.id(locationId).deleteOne();
    return await country.save();
  } catch (error) {
    console.error("Error in deleteLocation:", error);
    throw error;
  }
};
