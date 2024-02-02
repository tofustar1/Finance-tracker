import express from "express";
import Transaction from "../models/Transaction";
import {ITransaction} from "../types";
import mongoose from "mongoose";

const transactions = express.Router();

transactions.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('category');
    res.send(transactions);
  } catch (e) {
    res.status(500).send(e);
  }
});

transactions.post('/', async (req, res, next) => {
  const { category, amount, name } = req.body;

  if (!amount || !category) {
    return res.status(400).send({error: 'Category and amount is required fields'});
  }

  const transactionData : Omit<ITransaction, 'createdAt'>  = {
    name,
    category,
    amount
  };

  const transaction = new Transaction(transactionData);

  try {
    await transaction.save();
    res.send(transaction);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      console.log('here');
      return res.status(400).send(e);
    }
    next(e);
  }
});


export default transactions;