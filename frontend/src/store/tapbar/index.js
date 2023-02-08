import { createSlice } from "@reduxjs/toolkit";

export const tapbarSlice = createSlice({
  name: "tapbar",
  initialState: {
    page: "home",
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export default tapbarSlice.reducer;
export const { setPage } = tapbarSlice.actions;
