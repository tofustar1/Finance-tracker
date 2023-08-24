import React from 'react';
import {ICategory} from "../../types";
import './CardItem.css';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {getCategories, removeCategory} from "../../store/categoriesThunk";
import {selectRemoveCategoryLoading, setCategory, showCategoryModal} from "../../store/categoriesSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {setAlert} from "../../store/alertSlice";

interface Props {
  category: ICategory;
}
const CategoryItem : React.FC<Props> = ({category}) => {
  const dispatch = useAppDispatch();
  const removeLoading = useAppSelector(selectRemoveCategoryLoading);

  let typeClassName : string[] = ['card-type'];
  if(category.type === 'income') {
    typeClassName.push('income');
  } else {
    typeClassName.push('expense');
  }

  const onDeleteClick = async (id: string) => {
    if (window.confirm('Do you really want to delete this category?')) {
      await dispatch(removeCategory(id));
      await dispatch(getCategories());
      dispatch(setAlert({
        message: 'Category successfully removed',
        type: 'danger'
      }));
    }
  };

  const onEditHandler = () => {
    dispatch(showCategoryModal(true));
    dispatch(setCategory(category));
  };

  return (
      <div className="card-item">
        <h5 className="card-name">{category.name}</h5>
        <div>
          <span className={typeClassName.join(' ')}>{category.type}</span>
          <button
              className="btn btn-edit"
              onClick={onEditHandler}
          >
            Edit
          </button>
          <button
              className="btn btn-delete"
              onClick={() => onDeleteClick(category.id)}
              disabled={removeLoading ? removeLoading === category.id : false}
          >
            {removeLoading && removeLoading === category.id && <ButtonSpinner/>}
            Delete
          </button>
        </div>
      </div>
  );
};

export default CategoryItem;