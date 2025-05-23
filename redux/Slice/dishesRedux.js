import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const randomApiData = createAsyncThunk('get/random', async (_, thunkApi) => {
    try {
        let arr = [];
        const res = await Promise.all([
            axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
            axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
            axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
            axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
            axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
            axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
            axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
            axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
            axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
            axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
        ])
        const data = res.map((response) => response.data);
        data.forEach((ele) => arr.push(ele.meals[0]));
        console.log(arr);
        return arr;
    } catch (error) {
        console.log(error);
    }
})

export const backendDishData = createAsyncThunk('get/dishes', async (_, thunkApi) => {
    try {
        // const data = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const parsedData = await data.json();
        return parsedData.meals;
    } catch (error) {
        console.log(error);
    }
})

export const countryWiseDish = createAsyncThunk('get/countryDish', async (name, thukapi) => {
    try {
        const data = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);
        return data.data.meals;
    } catch (error) {
        console.log(error);
    }
})

export const dishApiSearch=createAsyncThunk('get/dish search',async(text,_)=>{
    try {
        let data=await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`);
        return data.data.meals;
    } catch (error) {
        console.log(error);
    }
})

const INITIALSTATE = {
    dishes: [
        { strArea: 'All World' }
    ]
}

const dishSlice = createSlice({
    name: 'dish',
    initialState: INITIALSTATE,
    extraReducers: (builder) => {
        builder.addCase(backendDishData.fulfilled, (state, action) => {
            state.dishes.push(...action.payload);
        })
    }
})

export const dishReducer = dishSlice.reducer;
export const dishSelector = (state) => state.dishReducer.dishes;