import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import authReducer from "./slices/authSlice";
import api from "./services/api";
import errorSlice from "./slices/errorSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import alertSlice from "./slices/alertSlice";
import analaysisReducer from "./slices/analaysis";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  theme: themeReducer,
  auth: authReducer,
  error: errorSlice,
  alert: alertSlice,
  analaysis: analaysisReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["api", "alert"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export default store;
