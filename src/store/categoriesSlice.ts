import {createSlice} from "@reduxjs/toolkit";
import {ICategory} from "../types";
import {addCategory, editCategory, getCategories, removeCategory} from "./categoriesThunk";
import {RootState} from "../app/store";

interface CategoriesState {
  items: ICategory[];
  item: ICategory | null;
  isShowCategoryModal: boolean;
  getAllLoading: boolean;
  addLoading: boolean;
  removeLoading: boolean | string;
}

const initialState: CategoriesState = {
  items: [],
  item: null,
  isShowCategoryModal: false,
  getAllLoading: false,
  addLoading: false,
  removeLoading: false,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    showCategoryModal: (state, action) => {
      state.isShowCategoryModal = action.payload;
    },

    clearCategoryItem: (state) => {
      state.item = null;
    },

    setCategory: (state, {payload : category}) => {
      state.item = category;
    },

  },
  extraReducers: (builder) => {
    builder
        .addCase(getCategories.pending, (state) => {
          state.getAllLoading = true;
        })
        .addCase(getCategories.fulfilled, (state, action) => {
          state.getAllLoading = false;
          state.items = action.payload;
        })
        .addCase(getCategories.rejected, (state) => {
          state.getAllLoading = false;
        });

    builder
        .addCase(addCategory.pending, (state) => {
          state.addLoading = true;
        })
        .addCase(addCategory.fulfilled, (state) => {
          state.addLoading = false;
          state.isShowCategoryModal = false;
        })
        .addCase(addCategory.rejected, (state) => {
          state.addLoading = false;
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

    builder
        .addCase(editCategory.pending, (state) =>{
          state.addLoading = true;
        })
        .addCase(editCategory.fulfilled, (state) =>{
          state.addLoading = false;
          state.isShowCategoryModal = false;
        })
        .addCase(editCategory.rejected, (state) =>{
          state.addLoading = false;
        })
  }
});

export const selectCategories = (state: RootState) => state.categories.items;

export const selectCategory = (state: RootState) => state.categories.item;

export const selectGetCategoriesLoading = (state: RootState) => state.categories.getAllLoading;

export const selectRemoveCategoryLoading = (state: RootState) => state.categories.removeLoading;
export const selectAddCategoryLoading = (state: RootState) => state.categories.addLoading;

export const selectCategoryModal = (state: RootState) => state.categories.isShowCategoryModal;

export const categoriesReducer = categoriesSlice.reducer;

export const {showCategoryModal, clearCategoryItem, setCategory} = categoriesSlice.actions;