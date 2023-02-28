import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

const initialState: string[] = [];

export const tableSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<string[]>) =>
      (state = action.payload),
  },
});

export const { setImages } = tableSlice.actions;

export const selectImages = (state: RootState) => state.images;

export default tableSlice.reducer;
