// src/features/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create the api slice
export const apiNewsSlice = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      // You can add headers here if needed
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["News"],
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: () => "news",
      transformResponse: (response) => response.reverse(),
      providesTags: (result) =>
        result ? result.map(({ _id }) => ({ type: "News", id: _id })) : [],
    }),

    getSingleNews: builder.query({
      query: (id) => `news/${id}`,
      providesTags: (result, error, id) => [{ type: "News", id }],
    }),

    getLast5News: builder.query({
      query: () => `last5News`,
    }),
    getSomeNews: builder.query({
      query: ({ page = 1, limit = 8 }) =>
        `paginated?page=${page}&limit=${limit}`,
    }),

    deleteNews: builder.mutation({
      query: (id) => ({
        url: `news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "News", id }],
    }),

    createNews: builder.mutation({
      query: (formData) => ({
        url: "news",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "News" }],
    }),

    updateNews: builder.mutation({
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
          url: `news/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "News", id }],
    }),
  }),
});

export const {
  useGetAllNewsQuery,
  useGetSingleNewsQuery,
  useCreateNewsMutation,
  useGetLast5NewsQuery,
  useGetSomeNewsQuery,
  useDeleteNewsMutation,
  useUpdateNewsMutation,
} = apiNewsSlice;
