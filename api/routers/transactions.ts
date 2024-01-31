import express from "express";
import Transaction from "../models/Transaction";
import {ITransaction} from "../types";
import mongoose from "mongoose";

const transactions = express.Router();

transactions.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.send(transactions);
  } catch (e) {
    res.status(500).send(e);
  }
});

transactions.post('/', async (req, res, next) => {
  const { name, category } = req.body;

  if (!name) {
    return res.status(400).send({error: 'Name is required field'});
  }

  const transactionData : Omit<ITransaction, 'createdAt'>  = {
    name,
    category
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