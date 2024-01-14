import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app.slice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    appReducer,
  },
  // @ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),

});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Get the current state of the store
export const state = store.getState();