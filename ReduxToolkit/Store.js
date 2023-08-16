import { configureStore } from "@reduxjs/toolkit";
import { SideBarTabSlice } from "./Slices/UiCompSlice/SideBarTab";

const store = configureStore({
  reducer: {
    SideBarTab: SideBarTabSlice.reducer,
  },
});

export default store;
