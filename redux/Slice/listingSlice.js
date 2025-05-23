import { createSlice } from "@reduxjs/toolkit";
import { countryWiseDish, dishApiSearch, randomApiData } from "./dishesRedux";

const INITIALSTATE = {
    lists: []
}

const listSlice = createSlice({
    name: 'latest-lisings',
    initialState: INITIALSTATE,
    reducers: {
        addLists: (state, action) => {
            state.lists.push(...action.payload);
        },
        deleteLists: (state, action) => {
            state.lists = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(countryWiseDish.fulfilled, (state, action) => {
            state.lists = [];
            state.lists.push(...action.payload);
        }).addCase(randomApiData.fulfilled,(state,action)=>{
            state.lists.push(...action.payload);
        }).addCase(dishApiSearch.fulfilled,(state,action)=>{
            state.lists=[];
            state.lists.push(...action.payload);
        })
    }
})

export const listReducer = listSlice.reducer;
export const { addLists, deleteLists } = listSlice.actions;
export const listSelector = (state) => state.listReducer.lists;