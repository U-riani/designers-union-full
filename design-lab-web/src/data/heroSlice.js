import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const heroApiSlice = createApi({
  reducerPath: "heroApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://design-union-server.onrender.com/api/",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Hero"],
  endpoints: (builder) => ({
    getAllHeros: builder.query({
      query: () => "heros",
      providesTags: ["Hero"],
    }),
    getSingleHero: builder.query({
      query: (id) => `heros/${id}`,
      providesTags: (result, error, id) => [{ type: "Hero", id }],
    }),
    createHero: builder.mutation({
      query: (formData) => ({
        url: "heros",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Hero"],
    }),
    deleteHero: builder.mutation({
      query: (id) => ({
        url: `heros/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Hero", id }],
    }),
    updateHero: builder.mutation({
      query: ({ id, text, image }) => {
        const formData = new FormData();
        formData.append("text[ge]", text.ge);
        formData.append("text[en]", text.en);
        if (image) formData.append("images", image);
        return {
          url: `heros/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Hero", id }],
    }),
  }),
});

export const {
  useGetAllHerosQuery,
  useGetSingleHeroQuery,
  useCreateHeroMutation,
  useDeleteHeroMutation,
  useUpdateHeroMutation,
} = heroApiSlice;
