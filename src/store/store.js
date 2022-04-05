import { configureStore } from "@reduxjs/toolkit";
import eventPickerReducer from "../EventPicker/eventPickerSlice";
import { api } from "../services/api";

const store = configureStore({
  reducer: {
    eventPicker: eventPickerReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devtools: true,
});

export default store;
