import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  DeleteEndpoint,
  PostEndpoint,
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
    getProperty: QueryParamsEndpoint(builder, "properties"),
    addProperty: PostEndpoint(builder, "properties"),
    updateProperty: UpdateEndpoint(builder, "properties"),
    deleteProperty: DeleteEndpoint(builder, "properties"),
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
  useAddPropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = api;

export default api;
