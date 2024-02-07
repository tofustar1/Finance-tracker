import mongoose from "mongoose";

export interface ICategory {
  name: string;
  type: string;
}

export interface ITransaction {
  createdAt: Date;
  category: mongoose.Types.ObjectId;
  amount: numer;
}