import mongoose, { Types } from "mongoose";
import { ITransaction} from "../types";
import Category from "./Category";
const Schema = mongoose.Schema;

const TransactionSchema = new Schema<ITransaction>({
  name: String,
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await Category.findById(value),
      message: 'Category does not exist!',
    }
  },
  amount: {
    type: Number,
    required: true
  }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;