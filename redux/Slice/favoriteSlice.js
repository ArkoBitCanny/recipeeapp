import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE = {
    favorite: []
}

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: INITIALSTATE,
    reducers: {
        addFavorite: (state, action) => {
            state.favorite.push(action.payload);
        },
        removeFavorite: (state, action) => {
            let index = state.favorite.findIndex(ele => ele.id === action.payload);
            state.favorite.splice(index, 1);
        }
    }
});

export const favoriteReducer = favoriteSlice.reducer;
export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export const favoriteSelector = (state) => state.favoriteReducer.favorite;