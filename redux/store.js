import { configureStore } from "@reduxjs/toolkit";
import { dishReducer } from "./Slice/dishesRedux";
import { listReducer } from "./Slice/listingSlice";
import { favoriteReducer } from "./Slice/favoriteSlice";

const store=configureStore({
    reducer:{
        dishReducer,
        listReducer,
        favoriteReducer
    }
})

export default store;