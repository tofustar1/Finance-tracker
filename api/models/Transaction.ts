import mongoose, { Types } from "mongoose";
import { ITransaction} from "../types";
import Category from "./Category";
const Schema = mongoose.Schema;

const TransactionSchema = new Schema<ITransaction>({
  name: {
    type: String,
    required: true
  },
  createdAd: {
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
      message: 'Category does nit exist!',
    }
  }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;