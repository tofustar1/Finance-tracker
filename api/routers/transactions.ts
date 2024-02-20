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
      return res.status(400).send(e);
    }
    next(e);
  }
});

transactions.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);
    if(!transaction) {
      return res.status(404).send('Transaction not found!');
    }

    await Transaction.findByIdAndDelete(id);
    res.send('Transaction deleted successfully')
  } catch (e) {
    console.error('Error deleting transaction:', e);
    res.status(500).send('An error occurred while deleting the transaction');
  }
});


export default transactions;