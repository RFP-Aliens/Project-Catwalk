import React, {useState, useEffect, useContext} from 'react';
import { GlobalContext } from './context/GlobalState.js'
import {  useParams, useLocation } from 'react-router-dom';

import { RelatedProducts } from './components/RelatedItemsAndOutfit/RelatedProducts.jsx'
import { RatingsAndReviews } from './components/RatingsAndReviews/RatingsAndReviews.jsx'
import { Overview } from './components/Overview/Overview.jsx'

import { RatingsAndReviewsProvider } from './context/RatingsAndReviewsState.js';



const ProductDetail = () => {
  let { id } = useParams();
  // console.log('product id from url params', id)
  const { updateCurrentProductId, currentProductId, getAllProducts } = useContext(GlobalContext);

  useEffect(() =>{
    updateCurrentProductId(id);
    getAllProducts();
    console.log('===> get into the useEffect to update product id')
  },[id])

  console.log('current product id at global state', currentProductId);



  return (
    <div>
      <div className="app">Hello from product detail</div>

      <Overview />
      <RelatedProducts />
      <RatingsAndReviewsProvider>
        <RatingsAndReviews />
      </RatingsAndReviewsProvider>

    </div>
  );
}
export default ProductDetail;