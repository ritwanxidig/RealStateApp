import { getById as getUserById } from "../models/User";
import { ILandDDO } from "../interfaces/ILandDDO";
import {
  getCityById,
  getCountryById,
  getLocationById,
} from "../models/Address";

export const changeToLandInterface = async (land: Record<string, any>) => {
  const country = await getCountryById(land.address.country);
  const city = await getCityById(land.address.city, land.address.country);

  const user = await getUserById(land.userRef.toString());

  const location = await getLocationById(
    land.address.country,
    land.address.city,
    land.address.location
  );
  const landDDO: ILandDDO = {
    _id: land._id.toString(),
    _createdAt: land.createdAt,
    _updatedAt: land.updatedAt,
    size: land.size,
    address: {
      country: country.name,
      city: city.cities[0].name,
      location: location?.cities[0]?.locations[0]?.name,
    },
    images: land.images,
    price: land.price,
    description: land.description,
    user: {
      name: user?.name,
      username: user?.username,
      email: user?.email,
      roles: user?.roles,
      profilePic: user?.profilePic,
    },
  };
  return landDDO;
};
