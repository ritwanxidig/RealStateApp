import { IPropertyDDO } from "../interfaces/IPropertyDDO";
import { getCityById, getCountryById, getLocationById } from "../models/Address";
import { getById } from "../models/User";

export const changeToPropertyInterface = async (property: Record<string, any>) => {
  const createdUser = await getById(property.userRef.toString());
  const country = await getCountryById(property.address.country);
  // city holds an object of one country with array of single city:
  //  like {_id: "5f8f6e0e1b7f9c0f1b7f9c0f", name: "kathmandu", cities: [{ _id: "5f8f6e0e1b7f9c0f1b7f9c0f", name: "kathmandu", locations: [{ _id: "5f8f6e0e1b7f9c0f1b7f9c0f", name: "kathmandu" }] }]}
  const city = await getCityById(
    property.address.city,
    property.address.country
  );

  // location is same as city.locations[0]
  const location = await getLocationById(
    property.address.country,
    property.address.city,
    property.address.location
  );
  const propertyDDO: IPropertyDDO = {
    _id: property._id.toString(),
    _createdAt: property.createdAt,
    _updatedAt: property.updatedAt,
    name: property?.name,
    description: property.description,
    price: property.price,
    discount: property.discount,
    imageUrls: property.imageUrls,
    type: property.type,
    beds: property.beds,
    baths: property.baths,
    furnished: property.furnished,
    parking: property.parking,
    area: property.area,
    address: {
      country: country.name,
      city: city.cities[0].name,
      location: location?.cities[0]?.locations[0]?.name,
    },
    user: {
      name: createdUser?.name,
      username: createdUser?.username,
      email: createdUser?.email,
      roles: createdUser?.roles,
      profilePic: createdUser?.profilePic,
    },
  };
  return propertyDDO;
};
