import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectCategories} from "../../store/categoriesSlice";
import {ICategory, ITransaction, ITransactionForm, ITransactionMutation} from "../../types";
import {selectAddTransactionLoading, showTransactionModal} from "../../store/transactionsSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";

const initialState: ITransactionForm = {
  type: '',
  category: {
    _id: '',
    name: '',
    type: '',
  },
  amount: 0,
};

interface Props {
  transaction: ITransaction | null;
  onSubmit: (newTransaction: ITransactionMutation) => void;
}

const TransactionForm: React.FC<Props> = ({onSubmit, transaction}) => {
  const [formState, setFormState] = useState<ITransactionForm>(initialState);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const addLoading = useAppSelector(selectAddTransactionLoading);

  const filteredCategories = (categories: ICategory[]) => {
    return categories.filter(category => category.type === formState.type);
  };

  useEffect(() => {
    if (transaction) {
      setFormState({
        type: transaction.category.type,
        category: transaction.category,
        amount: transaction.amount
      });
    } else {
      setFormState(initialState);
    }
  }, [transaction]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'type') {
      setFormState(prevState => ({
        ...prevState,
        category: {
          _id: '',
          name: '',
          type: '',
        },
      }));
    }
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toISOString();
    const desiredCategory = categories.find(category => category.name === formState.category.name);
    if (desiredCategory) {
      transaction ?
          onSubmit({
            createdAt: transaction.createdAt,
            amount: Number(formState.amount),
            category: desiredCategory._id
          })
          :
          onSubmit({
            createdAt: date,
            amount: Number(formState.amount),
            category: desiredCategory._id
          });
    }
    setFormState(initialState);
  };

  return (
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <select
              name="type"
              value={formState.type}
              className="form-select"
              id="type"
              onChange={onChangeHandler}
              required
          >
            <option disabled value="">Select a type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Type</label>
          <select
              name="category"
              value={formState.category.name}
              className="form-select"
              id="category"
              onChange={onChangeHandler}
              required
          >
            <option disabled value="">Select category</option>
            {filteredCategories(categories).map(category => (
                <option key={category._id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input
              type="number"
              name="amount"
              value={formState.amount}
              className="form-control"
              id="amount"
              onChange={onChangeHandler}
              min={1}
              required
          />
        </div>
        <div className="mb-3">
          <button
              type="button"
              className="btn btn-danger me-4"
              onClick={() => dispatch(showTransactionModal(false))}
          >
            Cancel
          </button>
          <button
              type="submit"
              className="btn btn-primary"
              disabled={addLoading}
          >
            {addLoading && <ButtonSpinner/>}
            {transaction ? 'Edit' : 'Add'}
          </button>
        </div>
      </form>
  );
};

export default TransactionForm;