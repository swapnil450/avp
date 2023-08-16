import { createSlice } from "@reduxjs/toolkit";

export const SideBarTabSlice = createSlice({
  name: "sidebar",
  initialState: "Dashboard", // Initial state should be an empty string or appropriate initial value
  reducers: {
    setSideBarTab(state, action) {
      return action.payload;
    },
  },
});

export const { setSideBarTab } = SideBarTabSlice.actions;

export default SideBarTabSlice.reducer;
