import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectsApiSlice = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://design-union-server.onrender.com/api/",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Projects"],
  endpoints: (builder) => ({
    getAllProjects: builder.query({ 
      query: () => "projects",
      transformResponse: (response) => response.reverse(),
      providesTags: ["Projects"],
    }),
    getLastThreeProjects: builder.query({ 
      query: () => "projects/lastThreeProjects",
      // transformResponse: (response) => response.reverse(),
      providesTags: ["Projects"],
    }),
    getAllProjectsImageTitle: builder.query({
      query: () => "projects/projectsImageTitleText",
      transformResponse: (response) => response.reverse(),
      providesTags: ["Projects"],
    }),
    getSingleProjects: builder.query({
      query: (id) => `projects/${id}`,
      providesTags: (result, error, id) => [{ type: "Projets", id }],
    }),
    createProjects: builder.mutation({
      query: (formData) => ({
        url: "projects",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProjects: builder.mutation({
      query: (id) => ({
        url: `projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Projects", id }],
    }),
    // updateProjects: builder.mutation({
    //   query: ({ projectId, name, heroes, description, mainProject }) => {
    //     const formData = new FormData();
    //     console.log(heroes)
    //     // Append the project name for both Georgian and English
    //     if (name) {
    //       formData.append("name[ge]", name.ge);
    //       formData.append("name[en]", name.en);
    //     }

    //     // Append the description for both Georgian and English
    //     if (description) {
    //       formData.append("description[ge]", description.ge);
    //       formData.append("description[en]", description.en);
    //     }

    //     // Append the main project image (if provided)
    //     if (mainProject && mainProject instanceof File) {
    //       formData.append("mainProject", mainProject);
    //     }

    //     // Append hero data (heroText and image files)
    //     heroes.forEach((hero, index) => {
    //       formData.append(`heroText[ge]`, hero.heroText.ge);
    //       formData.append(`heroText[en]`, hero.heroText.en);
    //       formData.append(`images`, hero.imageFile); // Allow multiple images
    //     });

    //     // heroes.forEach((hero, index) => {
    //     //   // Append heroText for both Georgian and English for each hero
    //     //   if (hero.heroText) {
    //     //     if (hero.heroText.ge) {
    //     //       formData.append(`heroData[${index}].heroText[ge]`, hero.heroText.ge);
    //     //     }
    //     //     if (hero.heroText.en) {
    //     //       formData.append(`heroData[${index}].heroText[en]`, hero.heroText.en);
    //     //     }
    //     //   }

    //     //   // Append hero image files (if provided)
    //     //   if (hero.imageFile instanceof File) {
    //     //     formData.append(`images`, hero.imageFile);
    //     //   } else if (hero.image && hero.image.length > 0) {
    //     //     // Append existing image URLs for each hero
    //     //     hero.image.forEach((imageUrl, imgIndex) => {
    //     //       formData.append(`heroData[${index}].image[${imgIndex}]`, imageUrl);
    //     //     });
    //     //   }
    //     // });

    //     return {
    //       url: `projects/${projectId}`, // Use the projectId for the URL
    //       method: "PATCH",
    //       body: formData, // Send the form data
    //     };
    //   },
    //   invalidatesTags: (result, error, { projectId }) => [
    //     { type: "Hero", id: projectId },
    //   ],
    // }),
    createProjectsHeroData: builder.mutation({
      query: ({ formData, projectId }) => ({
        url: `projects/heroData/${projectId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProjectsHerodata: builder.mutation({
      query: ({ id, index }) => ({
        url: `projects/heroData/${id}?index=${index}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Projects", id }],
    }),
    updateProjectsDescription: builder.mutation({
      query: ({ projectId, name, description, mainProject }) => {
        return {
          url: `projects/description/${projectId}`,
          method: "PATCH",
          body: { projectId, name, description, mainProject },
        };
      },
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Projects", id: projectId },
      ],
    }),
    updateProjectsHeroData: builder.mutation({
      query: ({ heroText, projectId, image, url, index }) => {
        const formData = new FormData();
        formData.append("index", index);
        formData.append("url", url);
        // formData.append("urlLastPart", urlLastPart)
        formData.append("heroText[ge]", heroText.ge);
        formData.append("heroText[en]", heroText.en);
        // console.log(url);
        if (image) formData.append("images", image);
        // if (image) formData.append(`heroes[${index}][imageFile]`, image);
        return {
          url: `projects/heroData/${projectId}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Projects", id: projectId },
      ],
    }),

    updateProjects: builder.mutation({
      query: ({
        projectId,
        name,
        description,
        heroText,
        heroes,
        mainProject,
      }) => {
        const formData = new FormData();

        // Append project data
        if (name) {
          formData.append("name[ge]", name.ge);
          formData.append("name[en]", name.en);
        }

        if (description) {
          formData.append("description[ge]", description.ge);
          formData.append("description[en]", description.en);
        }

        if (heroText) {
          formData.append("heroText[ge]", heroText.ge);
          formData.append("heroText[en]", heroText.en);
        }

        // Append main project image (if provided)
        if (mainProject && mainProject instanceof File) {
          formData.append("mainProject", mainProject);
        }

        // Handle heroes and their images
        heroes.forEach((hero, index) => {
          formData.append(`heroes[${index}].heroText[ge]`, hero.heroText.ge);
          formData.append(`heroes[${index}].heroText[en]`, hero.heroText.en);

          // Upload new images or retain old images
          if (hero.imageFile) {
            formData.append(`images`, hero.imageFile); // New image
          } else if (hero.oldImage) {
            formData.append(`images`, hero.oldImage); // Keep old image if no new image
          }
        });

        return {
          url: `projects/${projectId}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Projects", id: projectId },
      ],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetLastThreeProjectsQuery,
  useGetAllProjectsImageTitleQuery,
  useGetSingleProjectsQuery,
  useCreateProjectsMutation,
  useDeleteProjectsMutation,
  useDeleteProjectsHerodataMutation,
  useCreateProjectsHeroDataMutation,
  useUpdateProjectsDescriptionMutation,
  useUpdateProjectsHeroDataMutation,
} = projectsApiSlice;
