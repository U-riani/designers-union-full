import { configureStore } from "@reduxjs/toolkit";

import newsReducer from "./newsSlice";
import partnersReducer from "./partnerSlice";
import designersReducer from "./designersSlice";
import { apiVisitsSlice } from "./visitsSlice";

import { apiNewsSlice } from "./newsSlice2";
import { apiBlogSlice } from "./blogSlice.js";
import { apiAboutUsSlice } from "./aboutUsSlice.js";
import { heroApiSlice } from "./heroSlice";
import { partnersApiSlice } from "./partnersSlice";
import { designersApiSlice } from "./designersSlice2";
import { projectsApiSlice } from "./projectsSlice.js";
import { projectContentApiSlice } from "./projectContentSlice.js";
import { apiTeamSlice } from "./apiTeamSlice";

const store = configureStore({
  reducer: {
    news: newsReducer,
    partners: partnersReducer,
    designers: designersReducer,
    [apiNewsSlice.reducerPath]: apiNewsSlice.reducer,
    [apiAboutUsSlice.reducerPath]: apiAboutUsSlice.reducer,
    [apiVisitsSlice.reducerPath]: apiVisitsSlice.reducer,
    [partnersApiSlice.reducerPath]: partnersApiSlice.reducer,
    [heroApiSlice.reducerPath]: heroApiSlice.reducer,
    [apiBlogSlice.reducerPath]: apiBlogSlice.reducer,
    // [heroApiSlice.reducerPath]:  heroApiSlice.reducer,
    [designersApiSlice.reducerPath]: designersApiSlice.reducer,
    [projectsApiSlice.reducerPath]: projectsApiSlice.reducer,
    [projectContentApiSlice.reducerPath]: projectContentApiSlice.reducer,
    [apiTeamSlice.reducerPath]: apiTeamSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiNewsSlice.middleware,
      apiBlogSlice.middleware,
      apiAboutUsSlice.middleware,
      apiVisitsSlice.middleware,
      heroApiSlice.middleware,
      partnersApiSlice.middleware,
      designersApiSlice.middleware,
      projectsApiSlice.middleware,
      projectContentApiSlice.middleware,
      apiTeamSlice.middleware
    ),
});

export default store;
