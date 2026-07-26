// src/features/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the api slice
export const apiBlogSlice = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://design-union-server.onrender.com/api/",
    prepareHeaders: (headers) => {
      // You can add headers here if needed
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => "blogs",
      transformResponse: (response) => response.reverse(),
      providesTags: (result) =>
        result ? result.map(({ _id }) => ({ type: "Blogs", id: _id })) : [],
    }),

    getSingleBlogs: builder.query({
      query: (id) => `blogs/${id}`,
      providesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),

    getLast5Blogs: builder.query({
      query: () => `last5Blogs`,
    }),

    deleteBlogs: builder.mutation({
      query: (id) => ({
        url: `blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),

    createBlogs: builder.mutation({
      query: (formData) => ({
        url: "blogs",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Blogs" }],
    }),

    updateBlogs: builder.mutation({
      query: ({ id, title, text, images }) => {
        const formData = new FormData();
        formData.append("title[ge]", title.ge);
        formData.append("title[en]", title.en);
        formData.append("text[ge]", text.ge);
        formData.append("text[en]", text.en);

        if (images && images.length > 0) {
          images.forEach((image) => formData.append("images", image));
        }

        return {
          url: `blogs/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Blogs", id }],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetSingleBlogsQuery,
  useCreateBlogsMutation,
  useGetLast5BlogsQuery,
  useDeleteBlogsMutation,
  useUpdateBlogsMutation,
} = apiBlogSlice;
