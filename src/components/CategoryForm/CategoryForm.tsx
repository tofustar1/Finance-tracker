import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectAddCategoryLoading, selectCategory, showCategoryModal} from "../../store/categoriesSlice";
import {addCategory, editCategory, getCategories} from "../../store/categoriesThunk";
import {ICategoryMutation} from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  id? : string;
}

const initialState: ICategoryMutation = {
  name: '',
  type: '',
}
const CategoryForm : React.FC<Props> = ({id}) => {
  const dispatch = useAppDispatch();
  const oneCategory = useAppSelector(selectCategory);
  const addLoading = useAppSelector(selectAddCategoryLoading);
  const [category, setCategory] = useState<ICategoryMutation>(oneCategory ? oneCategory : {
    name: '',
    type: '',
  });

  useEffect(() => {
    if (oneCategory) {
      setCategory(oneCategory);
    } else {
      setCategory(initialState);
    }
  }, [oneCategory]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    setCategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (oneCategory && id) {
      await dispatch(editCategory({ id, category}));
    } else {
      await dispatch(addCategory(category));
    }

    await dispatch(getCategories());
  };


  return (
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <select
              name="type"
              value={category.type}
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
              value={category.name}
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
            {oneCategory ? 'Edit' : 'Add'}
          </button>
        </div>

      </form>
  );
};

export default CategoryForm;