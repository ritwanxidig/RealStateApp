import * as yup from "yup";

export const LandFormValidation = yup.object().shape({
  width: yup
    .number()
    .required("Width is required")
    .min(1, "Width must be greater than 0"),
  height: yup
    .number()
    .required("Height is required")
    .min(1, "Height must be greater than 0"),
  unit: yup.string().required("Unit is required"),
  images: yup.array().min(1, "At least one image is required"),
  description: yup.string(),
  address: yup.object().shape({
    country: yup.string("Enter the country").required("Country is required"),
    city: yup.string("Enter the city").required("City is required"),
    location: yup.string("Enter the location").required("Location is required"),
  }),
  price: yup
    .number()
    .required("Price is required")
    .min(1, "Price must be greater than 0"),
});
