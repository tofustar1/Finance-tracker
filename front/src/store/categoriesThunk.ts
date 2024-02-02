import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {ICategory, ICategoryMutation, IEditCategory} from "../types";

export const getCategories = createAsyncThunk<ICategory[]>(
    'categories/getAll',
    async () => {
        const response = await axiosApi<ICategory[]>('/categories');
        return  response.data;
    }
);

export const addCategory = createAsyncThunk<void, ICategoryMutation>(
    'categories/add',
    async (category) => {
      await axiosApi.post(`/categories`, category);
    }
);


export const editCategory = createAsyncThunk<void, IEditCategory>(
    'categories/edit',
    async (params) => {
      await axiosApi.put(`categories/${params._id}.json`, params.category);
    }
);

export const removeCategory = createAsyncThunk<void, string>(
    'categories/remove',
    async (id) => {
      await axiosApi.delete(`categories/${id}.json`);}
);