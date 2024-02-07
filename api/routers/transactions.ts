import express from "express";
import mongoose from "mongoose";
import Transaction from "../models/Transaction";
import {ITransaction} from "../types";

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
  const { category, amount } = req.body;

  if (!amount || !category) {
    return res.status(400).send({error: 'Category and amount is required fields'});
  }

  const transactionData : Omit<ITransaction, 'createdAt'>  = {
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

transactions.put('/:id', async (req, res, next) => {
  try{
    const { id } = req.params;
    const { category, amount } = req.body;

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).send('Transaction not found!');
    }

    const transactionData: Omit<ITransaction, 'createdAt'> = {
      category: category ? category : transaction.category,
      amount: amount ? amount : transaction.amount,
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(id, transactionData, {new: true});


    res.send(updatedTransaction);
  } catch (e) {
    res.status(500).send('An error occurred while editing the transaction');
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