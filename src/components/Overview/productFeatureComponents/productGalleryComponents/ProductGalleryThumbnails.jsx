import React, { useEffect, useContext } from 'react'
import { GlobalContext } from '../../../../context/GlobalState.js'
import { ProductGalleryThumbnailItem } from './ProductGalleryThumbnailItem.jsx'
import { OverviewContext } from '../../../../context/OverviewState.js'


export const ProductGalleryThumbnails = () => {
  const { currentProductId } = useContext(GlobalContext);
  const {
    productStyles,
    getProductStyles,
    resetProductValue,
    featuredStyleIndex,
    featuredProductImageIndex
  } = useContext(OverviewContext);

  useEffect(() => {
    getProductStyles(currentProductId);
    return (() => {
      resetProductValue([])
    })
  }, [currentProductId])

  let featuredProductThumbnailsArray = productStyles.data ? productStyles.data.results[featuredStyleIndex].photos : []
  let featuredProduct = productStyles.data ? productStyles.data.results[featuredStyleIndex] : []

  return (
    <div>
      {featuredProductThumbnailsArray.map(
        (listItem, index) =>
          <ProductGalleryThumbnailItem
            item={listItem}
            key={index}
            index={index}
            style_id={featuredProduct.style_id}
            featuredProduct={featuredProductImageIndex}/>
      )}
    </div>
  );
}