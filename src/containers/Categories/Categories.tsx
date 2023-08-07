import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {
  clearCategoryItem,
  selectCategories,
  selectCategoryModal,
  selectGetCategoriesLoading,
  showCategoryModal
} from "../../store/categoriesSlice";
import {getCategories, getCategory} from "../../store/categoriesThunk";
import Spinner from "../../components/Spinner/Spinner";
import CardItem from "../../components/CardItem/CardItem";
import './Categories.css';
import Modal from "../../components/Modal/Modal";
import CategoryForm from "../../components/CategoryForm/CategoryForm";

let title = '';
let editId = '';

const Categories = () => {

  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const getLoading = useAppSelector(selectGetCategoriesLoading);
  const categoryModal = useAppSelector(selectCategoryModal);


  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const getCategoryInfo = async (id: string) => {
    title = 'Edit category';
    await dispatch(getCategory(id));
    editId = id;
    dispatch(showCategoryModal(true));
  };

  const onAddBtnClick = async () => {
    title = 'Add category';
    dispatch(clearCategoryItem());
    dispatch(showCategoryModal(true));
  };

  return (
      <>
        <div className="categories-top">
          <h2>Categories</h2>
          <button className="btn btn-add" onClick={onAddBtnClick}>ADD Categorie</button>
        </div>
        {getLoading ?
            <Spinner/>
            :
          categories.map(category => (
            <CardItem
                key={category.id}
                category={category}
                onEditClick={() => getCategoryInfo(category.id)}
            />
        ))}
        <Modal
            show={categoryModal}
            title={title}
            onClose={() => dispatch(showCategoryModal(false))}>
          <div className="modal-body">
            <CategoryForm id={editId}/>
          </div>
        </Modal>
      </>
  );
};

export default Categories;