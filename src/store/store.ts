import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import msrReducer from "./msr/slice"
import userReducer from "./users/slice"
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const msrPersistConfig = {
  key: "msr",
  storage: storage,
  whitelist: ["selected"],
};
// Get Persist
const msrPersistReducer = persistReducer(msrPersistConfig, msrReducer);

const userPersistConfig = {
  key: "users",
  storage: storage,
  whitelist: ["currentUser"],
};
// Get Persist
const userPersistReducer = persistReducer(userPersistConfig, userReducer);

const rootReducer = combineReducers({
  msr: msrPersistReducer,
  users: userPersistReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;