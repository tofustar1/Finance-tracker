import React from 'react';
import Backdrop from "../Backdrop/Backdrop";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectCategory, selectCategoryModal, showCategoryModal} from "../../store/categoriesSlice";
import CategoryForm from "../CategoryForm/CategoryForm";
import {addCategory, editCategory, getCategories} from "../../store/categoriesThunk";
import {ICategoryMutation} from "../../types";


const CategoryModal = () => {
  const dispatch = useAppDispatch();
  const categoryModal = useAppSelector(selectCategoryModal);
  const category = useAppSelector(selectCategory);

  const onSubmit = async (newCategory: ICategoryMutation) => {
    if (category) {
      await dispatch(editCategory({
        id: category.id,
        category: newCategory
      }));
    } else {
      await dispatch(addCategory(newCategory));
    }
    await dispatch(getCategories());
  };

  return (
    <>
      <Backdrop show={categoryModal} />
      <div
        className="modal show"
        style={{display: categoryModal ? 'block' : 'none'}}
        onClick={() => dispatch(showCategoryModal(false))}
      >
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{category ? 'Edit Category' : 'Add Category'}</h1>
            </div>
            <div className="modal-body">
              <CategoryForm category={category} onSubmit={onSubmit}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryModal;