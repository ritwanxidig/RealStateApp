export interface IPropertyDDO {
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
  offer: boolean;
  area: String;
  address: { country: String; city: String; location: String };
  user: {
    name: String;
    username: String;
    email: String;
    roles: string[];
    
  };
}
