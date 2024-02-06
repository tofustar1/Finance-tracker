import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectCategories} from "../../store/categoriesSlice";
import {ICategory, ITransaction, ITransactionForm, ITransactionMutation} from "../../types";
import {selectAddTransactionLoading, showTransactionModal} from "../../store/transactionsSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";

const initialState: ITransactionForm = {
  _id: '',
  name: '',
  type: '',
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

  useEffect(() => {
    const category = filteredCategoriesByName(categories);
    if (category) {
      setFormState(prevState => ({
        ...prevState,
        _id: category._id
      }));
    }
  }, [formState.name]);

  const filteredCategoriesByType = (categories: ICategory[]) => {
    return categories.filter(category => category.type === formState.type);
  };

  const filteredCategoriesByName = (categories: ICategory[]) => {
    return categories.find(category => category.name === formState.name);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));

  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: Number(formState.amount),
      category: formState._id
    });
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
          <label htmlFor="name" className="form-label">Category</label>
          <select
              name="name"
              value={formState.name}
              className="form-select"
              id="name"
              onChange={onChangeHandler}
              required
          >
            <option disabled value="">Select category</option>
            {filteredCategoriesByType(categories).map(category => (
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