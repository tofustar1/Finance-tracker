import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {ICategorie, ICategoriesList} from "../types";

export const getCategories = createAsyncThunk<ICategorie[]>(
    'categories/getAll',
    async () => {
        const response = await axiosApi<ICategoriesList | null>('categories.json');
        const categories = response.data;

        let newCategories: ICategorie[] = [];

        if(categories) {
            newCategories = Object.keys(categories).map((key) => {
                return {...categories[key], id: key}
            });
        }

        return newCategories;
    }
);

export const removeCategory = createAsyncThunk<void, string>(
    'categories/remove',
    async (id) => {
      await axiosApi.delete(`categories/${id}.json`);
    }
);