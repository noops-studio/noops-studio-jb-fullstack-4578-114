import { configureStore } from "@reduxjs/toolkit";
import { followingSlice } from "./followingSlice";

const store = configureStore({
    reducer: {
     followingSlice: followingSlice.reducer
    }
});

export default store;
// The RootState type is used to infer the type of the useSelector hook in the components.
export type RootState = ReturnType<typeof store.getState>;
// The AppDispatch type is used to infer the type of the useDispatch hook in the components.
export type AppDispatch = typeof store.dispatch;