import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const designersApiSlice = createApi({
  reducerPath: "designersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://design-union-server.onrender.com/api/",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Designer"],
  endpoints: (builder) => ({
    getAllDesigners: builder.query({
      query: () => "designers",
      providesTags: ["Designer"],
    }),
    getAllDesignersInfo: builder.query({
      query: () => "designers/allDesignersInfo",
      providesTags: ["Designer"],
    }),
    getSomeDesigners: builder.query({
      query: ({ page = 1, limit = 8 }) =>
        `designers/paginated?page=${page}&limit=${limit}`,
      providesTags: ["Designer"],
    }),
    getSingleDesigner: builder.query({
      query: (id) => `designers/${id}`,
      providesTags: (result, error, id) => [{ type: "Designer", id }],
    }),
    createDesigner: builder.mutation({
      query: (formData) => ({
        url: "designers",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Designer"],
    }),
    deleteDesigner: builder.mutation({
      query: (id) => ({
        url: `designers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Designer", id }],
    }),
    // updateDesigner: builder.mutation({
    //   query: ({
    //     id,
    //     text,
    //     name,
    //     companyPerson,
    //     images,
    //     facebook,
    //     instagram,
    //     behance,
    //     activeStatus,
    //     phone,
    //   }) => {
    //     const formData = new FormData();
    //     formData.append("name[ge]", name.ge);
    //     formData.append("name[en]", name.en);
    //     formData.append("text[ge]", text.ge);
    //     formData.append("text[en]", text.en);
    //     formData.append("companyPerson", companyPerson);
    //     formData.append("phone", phone);
    //     formData.append("facebook", facebook);
    //     formData.append("activeStatus", activeStatus);
    //     formData.append("instagram", instagram);
    //     formData.append("behance", behance);
    //     if (images) formData.append("images", images[0]);
    //     if (images) formData.append("images", images[1]);
    //     return {
    //       url: `designers/${id}`,
    //       method: "PATCH",
    //       body: formData,
    //     };
    //   },
    //   invalidatesTags: (result, error, { id }) => [{ type: "Designer", id }],
    // }),
    updateDesigner: builder.mutation({
      query: ({
        id,
        text,
        name,
        companyPerson,
        profilePhoto,
        projectPhoto,
        facebook,
        instagram,
        behance,
        activeStatus,
        phone,
        email,
      }) => {
        const formData = new FormData();

        formData.append("name[ge]", name.ge);
        formData.append("name[en]", name.en);
        formData.append("text[ge]", text.ge);
        formData.append("text[en]", text.en);
        formData.append("companyPerson", companyPerson);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("facebook", facebook);
        formData.append("activeStatus", activeStatus);
        formData.append("instagram", instagram);
        formData.append("behance", behance);

        if (profilePhoto instanceof File) {
          formData.append("profileImage", profilePhoto);
        }

        if (projectPhoto instanceof File) {
          formData.append("projectImage", projectPhoto);
        }

        return {
          url: `designers/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Designer", id }],
    }),
  }),
});

export const {
  useGetAllDesignersQuery,
  useGetAllDesignersInfoQuery,
  useGetSomeDesignersQuery,
  useGetSingleDesignerQuery,
  useCreateDesignerMutation,
  useDeleteDesignerMutation,
  useUpdateDesignerMutation,
} = designersApiSlice;
