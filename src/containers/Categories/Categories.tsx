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
import Alert from "../../components/Alert/Alert";

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
            categories.length > 0 ?
                categories.map(category => (
                    <CategoryItem
                        key={category.id}
                        category={category}
                    />
                )) :
                <div className="alert alert-dark w-25" role="alert">
                  No categories yet!
                </div>
        }
        <CategoryModal/>
        <Alert/>
      </>
  );
};

export default Categories;