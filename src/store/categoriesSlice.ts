import {createSlice} from "@reduxjs/toolkit";

interface CategoriesState {

}

const initialState: CategoriesState = {

}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

  }
});


export const categoriesReducer = categoriesSlice.reducer;