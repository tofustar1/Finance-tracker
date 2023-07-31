import {createSlice} from "@reduxjs/toolkit";
import {ICategorie} from "../types";
import {getCategories, removeCategory} from "./categoriesThunk";
import {RootState} from "../app/store";

interface CategoriesState {
  items: ICategorie[];
  getLoading: boolean;
  removeLoading: boolean | string;
}

const initialState: CategoriesState = {
  items: [],
  getLoading: false,
  removeLoading: false,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(getCategories.pending, (state) => {
          state.getLoading = true;
        })
        .addCase(getCategories.fulfilled, (state, action) => {
          state.getLoading = false;
          state.items = action.payload;
        })
        .addCase(getCategories.rejected, (state) => {
          state.getLoading = false;
        });

    builder
        .addCase(removeCategory.pending, (state, action) => {
          state.removeLoading = action.meta.arg;
        })
        .addCase(removeCategory.fulfilled, (state) => {
          state.removeLoading = false;
        })
        .addCase(removeCategory.rejected, (state) => {
          state.removeLoading = false;
        });

  }
});

export const selectCategories = (state: RootState) => state.categories.items;
export const selectGetCategoriesLoading = (state: RootState) => state.categories.getLoading;

export const selectRemoveCategoryLoading = (state: RootState) => state.categories.removeLoading;
export const categoriesReducer = categoriesSlice.reducer;