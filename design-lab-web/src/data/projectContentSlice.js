import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectContentApiSlice = createApi({
  reducerPath: "projectsContentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://design-union-server.onrender.com/api/",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Projects"],
  endpoints: (builder) => ({
    createProjectsContentTitle: builder.mutation({
      query: ({ title, id }) => ({
        url: `projects/content/projectContentTitle/${id}`,
        method: "POST",
        body: { title, id },
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProjectsContentTitle: builder.mutation({
      query: ({ title, id, index }) => ({
        url: `projects/content/projectContentTitle/${id}`,
        method: "PATCH",
        body: { title, id, index },
      }),
      invalidatesTags: ["Projects"],
    }),

    createProjectsContentVideo: builder.mutation({
      query: ({ videoId, id, index }) => ({
        url: `projects/content/projectContetnVideo/${id}`,
        method: "POST",
        body: { videoId, id, index },
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProjectsContentVideo: builder.mutation({
      query: ({ videoId, id, index }) => ({
        url: `projects/content/projectContetnVideo/${id}`,
        method: "PATCH",
        body: { videoId, id, index },
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProjectsContentImage: builder.mutation({
      query: ({ id, image, index, localIndex, type }) => {
        const formData = new FormData();
        formData.append("index", index);
        formData.append("localIndex", localIndex);
        formData.append("type", type);
        if (image) formData.append("images", image);
        return {
          url: `projects/content/projectContetnImage/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Projects", id: projectId },
      ],
    }),

    deleteSingleProjectContentImage: builder.mutation({
      query: ({ id, index, localIndex }) => {
        return {
          url: `projects/content/projectContetnImage/${id}?index=${index}&localIndex=${localIndex}`,
          method: "DELETE",
        };
      },
      providesTags: (result, error, id) => [{ type: "Projets", id }],
    }),

    deleteSingleProjectContent: builder.mutation({
      query: ({ id, index }) => {
        return {
          url: `projects/content/projectContent/${id}?index=${index}`,
          method: "DELETE",
        };
      },
      providesTags: (result, error, id) => [{ type: "Projets", id }],
    }),

    getSingleProjectContent: builder.query({
      query: ({ id, index }) =>
        `projects/content/projectContent/${id}?index=${index}`,
      providesTags: (result, error, id) => [{ type: "Projets", id }],
    }),
  }),
});

export const {
  useGetSingleProjectContentQuery,
  
  useCreateProjectsContentTitleMutation,
  useUpdateProjectsContentTitleMutation,
  useCreateProjectsContentVideoMutation,
  useUpdateProjectsContentVideoMutation,
  useUpdateProjectsContentImageMutation,
  useDeleteSingleProjectContentImageMutation,
  useDeleteSingleProjectContentMutation,
  
} = projectContentApiSlice;
