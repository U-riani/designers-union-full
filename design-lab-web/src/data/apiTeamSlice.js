// src/features/api/apiTeamSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiTeamSlice = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    // 🔹 GET ALL TEAM MEMBERS
    getTeamMembers: builder.query({
      query: () => "team",
      providesTags: (result) =>
        result
          ? [
              { type: "Team", id: "LIST" },
              ...result.map((item) => ({ type: "Team", id: item._id })),
            ]
          : [{ type: "Team", id: "LIST" }],
    }),

    // 🔹 CREATE
    createTeamMember: builder.mutation({
      query: (formData) => ({
        url: "team",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Team", id: "LIST" }],
    }),

    // 🔹 UPDATE
    updateTeamMember: builder.mutation({
      query: ({ id, formData }) => ({
        url: `team/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Team", id },
        { type: "Team", id: "LIST" },
      ],
    }),

    // 🔹 DELETE
    deleteTeamMember: builder.mutation({
      query: (id) => ({
        url: `team/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Team", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTeamMembersQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = apiTeamSlice;
