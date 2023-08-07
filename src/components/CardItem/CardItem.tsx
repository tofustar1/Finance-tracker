import React from 'react';
import {ICategory} from "../../types";
import './CardItem.css';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {getCategories, removeCategory} from "../../store/categoriesThunk";
import {selectRemoveCategoryLoading} from "../../store/categoriesSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  category: ICategory;
  onEditClick: React.MouseEventHandler;
}
const CardItem : React.FC<Props> = ({category, onEditClick}) => {
  const dispatch = useAppDispatch();

  const removeLoading = useAppSelector(selectRemoveCategoryLoading);

  let typeClassName : string[] = ['card-type', ];
  if(category.type === 'income') {
    typeClassName.push('income');
  } else {
    typeClassName.push('expense');
  }

  const onDeleteClick = async (id: string) => {
    if (window.confirm('Do you really want to delete this category?')) {
      await dispatch(removeCategory(id));
      await dispatch(getCategories());
    }
  };

  return (
      <div className="card-item">
        <h5 className="card-name">{category.name}</h5>
        <div className="card-inner">
          <span className={typeClassName.join(' ')}>{category.type}</span>
          <button className="btn btn-edit" onClick={onEditClick}>Edit</button>
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

export default CardItem;