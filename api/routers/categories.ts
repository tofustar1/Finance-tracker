import express from "express";
import mongoose from "mongoose";
import {ICategory} from "../types";
import Category from "../models/Category";
import Transaction from "../models/Transaction";

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

categories.put('/:id', async (req, res, next) => {
  try{
    const { id } = req.params;
    const { name, type } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).send('Category not found!');
    }

    const categoryData: ICategory = {
      name: name ? name : category.name,
      type: type ? type : category.type,
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, {new: true});


    res.send(updatedCategory);
  } catch (e) {
    res.status(500).send('An error occurred while editing the category');
  }
});

categories.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).send('Category not found!');
    }

    await Transaction.deleteMany({category: id});
    await Category.findByIdAndDelete(id);

    res.send('Category and related transactions deleted successfully');
  } catch (e) {
    res.status(500).send('An error occurred while deleting the category');
  }
});

export default categories;