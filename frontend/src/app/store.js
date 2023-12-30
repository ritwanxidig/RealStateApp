import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import authReducer from "./slices/authSlice";
import api from "./services/api";
import errorSlice from "./slices/errorSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  theme: themeReducer,
  auth: authReducer,
  error: errorSlice,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["api"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
