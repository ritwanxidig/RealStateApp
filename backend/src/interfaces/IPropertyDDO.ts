export interface IPropertyDDO {
  name: String;
  description: String;
  price: Number;
  discount: 0;
  imageUrls: [String];
  type: String;
  beds: Number;
  baths: Number;
  furnished: boolean;
  parking: boolean;
  offer: boolean;
  area: String;
  address: { country: String; city: String; location: String };
  user: String;
}
