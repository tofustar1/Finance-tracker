import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectCategories, selectGetCategoriesLoading} from "../../store/categoriesSlice";
import {getCategories} from "../../store/categoriesThunk";
import Spinner from "../../components/Spinner/Spinner";
import CardItem from "../../components/CardItem/CardItem";
import './Categories.css';

const Categories = () => {

  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const getLoading = useAppSelector(selectGetCategoriesLoading);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
      <>
        <div className="categories-top">
          <h2>Categories</h2>
          <button className="btn btn-add">ADD Categorie</button>
        </div>
        {getLoading ?
            <Spinner/>
            :
          categories.map(category => (
            <CardItem key={category.id} category={category}/>
        ))}
      </>
  );
};

export default Categories;