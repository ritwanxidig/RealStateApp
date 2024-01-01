import { toast } from "react-hot-toast";

export const Tags = ["Users", "Properties", "Lands"];

const onQueryStartedError = async (arg, { queryFulfilled }) => {
  try {
    await queryFulfilled;
  } catch (error) {
    if (error.error.status === 401) {
      localStorage.clear();
      window.location.href = "/auth/login";
      toast.error(error?.error?.data?.message || "Session Expired");
    } else {
      toast.error(error?.error?.data?.message || "Something went wrong");
    }
  }
};

export const QueryEndpoint = (builder, query) => {
  return builder.query({
    query: () => query,
    providesTags: Tags,
    onQueryStarted: onQueryStartedError,
  });
};

export const QueryParamsEndpoint = (builder, query) => {
  return builder.query({
    query: (param) => `${query}/${param}`,
    providesTags: Tags,
    onQueryStarted: onQueryStartedError,
  });
};

export const DeleteEndpoint = (builder, query) => {
  return builder.mutation({
    query: (param) => ({
      url: `/${query}/${param}`,
      method: "DELETE",
    }),
    invalidatesTags: Tags,
    onQueryStarted: onQueryStartedError,
  });
};

export const UpdateEndpoint = (builder, query) => {
  return builder.mutation({
    query: ({ param, ...body }) => ({
      url: `/${query}/${param}`,
      method: "PUT",
      body: body,
    }),
    invalidatesTags: Tags,
    onQueryStarted: onQueryStartedError,
  });
};

export const PostEndpoint = (builder, query) => {
  return builder.mutation({
    query: (body) => ({
      url: query,
      method: "POST",
      body: body,
    }),
    invalidatesTags: Tags,
    onQueryStarted: onQueryStartedError,
  });
};
