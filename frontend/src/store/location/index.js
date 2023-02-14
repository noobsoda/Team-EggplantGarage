import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    location: {
      lat: 36.354463,
      lng: 127.324351,
    },
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export default locationSlice.reducer;
export const { setLocation } = locationSlice.actions;
export const getLocation = (state) => state.location.location;
