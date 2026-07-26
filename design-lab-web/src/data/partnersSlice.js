import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const partnersApiSlice = createApi({
  reducerPath: "partnersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://design-union-server.onrender.com/api/",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Partner"],
  endpoints: (builder) => ({
    getAllPartners: builder.query({
      query: () => "partners",
      providesTags: ["Partner"],
    }),
    getSinglePartner: builder.query({
      query: (id) => `partners/${id}`,
      providesTags: (result, error, id) => [{ type: "Partner", id }],
    }),
    createPartner: builder.mutation({
      query: (formData) => ({
        url: "partners",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Partner"],
    }),
    deletePartner: builder.mutation({
      query: (id) => ({
        url: `partners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Partner", id }],
    }),
    updatePartner: builder.mutation({
      query: ({ id, text, name, websiteUrl, image }) => {
        const formData = new FormData();
        formData.append("name[ge]", name.ge);
        formData.append("name[en]", name.en);
        formData.append("text[ge]", text.ge);
        formData.append("text[en]", text.en);
        formData.append("websiteUrl", websiteUrl);
        return {
          url: `partners/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Partner", id }],
    }),
  }),
});

export const {
  useGetAllPartnersQuery,
  useGetSinglePartnerQuery,
  useCreatePartnerMutation,
  useDeletePartnerMutation,
  useUpdatePartnerMutation,
} = partnersApiSlice;
