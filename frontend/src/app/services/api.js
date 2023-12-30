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
    logout: PostEndpoint(builder, "auth/logout"),
    register: PostEndpoint(builder, "auth/register"),

    // users endpoints
    getUsers: QueryEndpoint(builder, "users"),
    getUser: QueryParamsEndpoint(builder, "users"),
    addUser: PostEndpoint(builder, "users"),
    updateUser: UpdateEndpoint(builder, "users"),
    deleteUser: DeleteEndpoint(builder, "users"),
  }),
});

export const {
  // hooks for auth
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  // hooks for users
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = api;

export default api;
