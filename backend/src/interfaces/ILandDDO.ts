export interface ILandDDO {
  _id: string;
  _createdAt: Date;
  _updatedAt: Date;
  size: String;
  description: String;
  price: Number;
  images: string[];
  address: { country: String; city: String; location: String };
  user: {
    name: String;
    username: String;
    email: String;
    roles: string[];
    profilePic: string;
  };
}
