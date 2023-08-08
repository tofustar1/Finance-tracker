import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectAddCategoryLoading, showCategoryModal} from "../../store/categoriesSlice";
import {ICategory, ICategoryMutation} from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";

const initialState : ICategoryMutation = {
  name: '',
  type: ''
};

interface Props {
  category: ICategory | null;
  onSubmit: (newCategory : ICategoryMutation) => void;
}
const CategoryForm : React.FC<Props> = ({category, onSubmit}) => {
  const [formState, setFormState] =
      useState<ICategoryMutation>(category || initialState);
  const dispatch = useAppDispatch();
  const addLoading = useAppSelector(selectAddCategoryLoading);

  useEffect(() => {
    if (category) {
      setFormState(category);
    } else {
      setFormState(initialState);
    }
  }, [category]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
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
          <label htmlFor="name" className="form-label">Name</label>
          <input
              type="name"
              name="name"
              value={formState.name}
              className="form-control"
              id="name"
              onChange={onChangeHandler}
              required
          />
        </div>
        <div className="mb-3">
          <button
              type="button"
              className="btn btn-danger me-5"
              onClick={() => dispatch(showCategoryModal(false))}
          >
            Cancel
          </button>
          <button
              type="submit"
              className="btn btn-primary"
              disabled={addLoading}
          >
            {addLoading && <ButtonSpinner/>}
            {category ? 'Edit' : 'Add'}
          </button>
        </div>
      </form>
  );
};

export default CategoryForm;