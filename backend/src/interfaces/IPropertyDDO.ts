export interface IPropertyDDO {
  _id: string;
  _createdAt: Date;
  _updatedAt: Date;
  name: String;
  description: String;
  price: Number;
  discount: Number;
  imageUrls: string[];
  type: String;
  beds: Number;
  baths: Number;
  furnished: boolean;
  parking: boolean;
  area: String;
  address: { country: String; city: String; location: String };
  user: {
    name: String;
    username: String;
    email: String;
    roles: string[];
    profilePic: string;
  };
}
