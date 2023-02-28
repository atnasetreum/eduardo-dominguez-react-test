import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import imageReducer from "./slices/image.slice";
import userReducer from "./slices/user.slice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    images: imageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
