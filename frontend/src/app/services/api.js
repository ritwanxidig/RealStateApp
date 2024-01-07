import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  DeleteEndpoint,
  PostEndpoint,
  PostWithParamsEndpoint,
  QueryEndpoint,
  QueryParamsEndpoint,
  Tags,
  UpdateEndpoint,
} from "./helpers";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3010",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: Tags,
  endpoints: (builder) => ({
    // auth endpoints
    login: PostEndpoint(builder, "auth/login"),
    signInWithGoogle: PostEndpoint(builder, "auth/google"),
    logout: PostEndpoint(builder, "auth/logout"),
    register: PostEndpoint(builder, "auth/register"),

    // users endpoints
    getUsers: QueryEndpoint(builder, "users"),
    getUser: QueryParamsEndpoint(builder, "users"),
    addUser: PostEndpoint(builder, "users"),
    updateUser: UpdateEndpoint(builder, "users"),
    deleteUser: DeleteEndpoint(builder, "users"),

    // properties endpoints
    getProperties: QueryEndpoint(builder, "properties"),
    searchProperty: QueryEndpoint(builder, "/properties/search"),
    getProperty: QueryParamsEndpoint(builder, "properties"),
    getMyProperties: QueryEndpoint(builder, "my-properties"),
    addProperty: PostEndpoint(builder, "properties"),
    updateProperty: UpdateEndpoint(builder, "properties"),
    deleteProperty: DeleteEndpoint(builder, "properties"),

    // countries endpoints
    getCountries: QueryEndpoint(builder, "countries"),
    getCountry: QueryParamsEndpoint(builder, "countries"),
    addCountry: PostEndpoint(builder, "countries"),
    updateCountry: UpdateEndpoint(builder, "countries"),
    deleteCountry: DeleteEndpoint(builder, "countries"),

    // cities endpoints
    getCities: QueryParamsEndpoint(builder, "cities"),
    getCity: QueryParamsEndpoint(builder, "cities"),
    addCity: PostWithParamsEndpoint(builder, "cities"),
    updateCity: UpdateEndpoint(builder, "cities"),
    deleteCity: DeleteEndpoint(builder, "cities"),

    // locations endpoints
    getLocations: QueryParamsEndpoint(builder, "locations"),
    getLocation: QueryParamsEndpoint(builder, "locations"),
    addLocation: PostWithParamsEndpoint(builder, "locations"),
    updateLocation: UpdateEndpoint(builder, "locations"),
    deleteLocation: DeleteEndpoint(builder, "locations"),
  }),
});

export const {
  // hooks for auth
  useLoginMutation,
  useSignInWithGoogleMutation,
  useLogoutMutation,
  useRegisterMutation,
  // hooks for users
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,

  // hooks for properties
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useSearchPropertyQuery,
  useGetMyPropertiesQuery,
  useAddPropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,

  // hooks for countries
  useGetCountriesQuery,
  useGetCountryQuery,
  useAddCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation,

  // hooks for cities
  useGetCitiesQuery,
  useGetCityQuery,
  useAddCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,

  // hooks for locations
  useGetLocationsQuery,
  useGetLocationQuery,
  useAddLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = api;

export default api;
