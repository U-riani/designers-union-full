import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiVisitsSlice = createApi({
  reducerPath: "visits",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://design-union-server.onrender.com/api/",
  }),
  endpoints: (builder) => ({
    getAllVisistsData: builder.query({
      query: () => "all-visits",
    }),
    getBookedTimes: builder.query({
      query: () => `/booked-times`, // Endpoint to get booked times for a specific date
    }),
    bookVisit: builder.mutation({
      query: (visitData) => ({
        url: "/book",
        method: "POST",
        body: visitData,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllVisistsDataQuery,
  useBookVisitMutation,
  useGetBookedTimesQuery,
} = apiVisitsSlice;
