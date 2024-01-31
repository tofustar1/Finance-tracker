import express from "express";
import Category from "../models/Category";
import {ICategory} from "../types";
import mongoose from "mongoose";

const categories = express.Router();

categories.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (e) {
    res.status(500).send(e);
  }
});

categories.post('/', async (req, res, next) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).send({error: 'Name or type is required fields'});
  }

  const categoryData : ICategory = {
    name,
    type
  };

  const category = new Category(categoryData);

  try {
    await category.save();
    res.send(category);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

export default categories;