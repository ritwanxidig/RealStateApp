export const Tags = ["Users", "Properties", "Lands"];

export const QueryEndpoint = (builder, query) => {
  return builder.query({
    query: () => query,
    providesTags: Tags,
  });
};

export const QueryParamsEndpoint = (builder, query) => {
  return builder.query({
    query: (param) => `${query}/${param}`,
    providesTags: Tags,
  });
};

export const DeleteEndpoint = (builder, query) => {
  return builder.mutation({
    query: (param) => ({
      url: `/${query}/${param}`,
      method: "DELETE",
    }),
    invalidatesTags: Tags,
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
  });
};
