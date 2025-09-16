import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "../services/api/tasksApi";

export const tasksStore = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof tasksStore.getState>;
export type AppDispatch = typeof tasksStore.dispatch;
