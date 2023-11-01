import { createSlice } from "@reduxjs/toolkit";

// Email slice
const emailSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = emailSlice.actions;
export const emailReducer = emailSlice.reducer;
