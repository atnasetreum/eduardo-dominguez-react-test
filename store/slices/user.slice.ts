import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "ts/interfaces";
import type { RootState } from "..";

const initialState: Employee[] = [];

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<Employee[]>) =>
      (state = action.payload),
  },
});

export const { setUsers } = userSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default userSlice.reducer;
