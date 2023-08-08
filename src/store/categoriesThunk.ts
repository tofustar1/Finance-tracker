import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {ICategoriesList, ICategory, ICategoryMutation, IEditCategory} from "../types";

export const getCategories = createAsyncThunk<ICategory[]>(
    'categories/getAll',
    async () => {
        const response = await axiosApi<ICategoriesList | null>('categories.json');
        const categories = response.data;

        let newCategories: ICategory[] = [];

        if(categories) {
            newCategories = Object.keys(categories).map((key) => {
                return {...categories[key], id: key}
            });
        }

        return newCategories;
    }
);

export const addCategory = createAsyncThunk<void, ICategoryMutation>(
    'categories/add',
    async (category) => {
      await axiosApi.post(`categories.json`, category);
    }
);


export const editCategory = createAsyncThunk<void, IEditCategory>(
    'categories/edit',
    async (params) => {
      await axiosApi.put(`categories/${params.id}.json`, params.category);
    }
);

export const removeCategory = createAsyncThunk<void, string>(
    'categories/remove',
    async (id) => {
      await axiosApi.delete(`categories/${id}.json`);
    }
);