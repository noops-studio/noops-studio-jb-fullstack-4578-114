import { configureStore } from "@reduxjs/toolkit";
import { followingSlice } from "./followingSlice";

const store = configureStore({
    reducer: {
     followingSlice: followingSlice.reducer
    }
});

export default store;