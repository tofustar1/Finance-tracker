import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {
  clearCategoryItem,
  selectCategories,
  selectGetCategoriesLoading,
  showCategoryModal
} from "../../store/categoriesSlice";
import {getCategories} from "../../store/categoriesThunk";
import Spinner from "../../components/Spinner/Spinner";
import CategoryItem from "../../components/CardItem/CategoryItem";
import './Categories.css';
import CategoryModal from "../../components/Modal/CategoryModal";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const getLoading = useAppSelector(selectGetCategoriesLoading);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onAddBtnClick = async () => {
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
            <CategoryItem
                key={category.id}
                category={category}
            />
        ))}
        <CategoryModal/>
      </>
  );
};

export default Categories;