import React, { createContext, useReducer } from 'react';
import AppReducer from './RRAppReducer.js';
const axios = require('axios');

//Initial state
const initialState = {
  allReviews: [],
  meta: [],
  averageRating: 0,
  totalRatings: 0,
  sortBy: 'relevant'
}

//create context
export const RatingsAndReviewsContext = createContext(initialState);

//provider component
// eslint-disable-next-line react/prop-types
export const RatingsAndReviewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function get(id, sortBy) {
    sortBy = sortBy || 'relevant'
    return axios.get(`/reviews/?product_id=${id}&sort=${sortBy}`)
  }

  function meta(id) {
    return axios.get(`/reviews/meta/?product_id=${id}`)
  }

  function updateReviewsState(id, sortBy) {
    Promise.all([get(id, sortBy), meta(id)])
      .then((results) => {
        let absolutetotal = 0;
        let totalratings = 0;
        for (var key in results[1].data.ratings) {
          totalratings += Number(results[1].data.ratings[key])
          absolutetotal += (Number(results[1].data.ratings[key]) * Number(key));
        }
        let average = (absolutetotal/totalratings);
        dispatch({
          type: 'GET_ALL_REVIEWS',
          all: results[0].data.results,
          average: average,
          total: totalratings,
          meta: results[1].data,
        })
      })
      .catch(err => console.log('THIS IS AN ERROR', err))
  }
  function getSort(id, sortBy) {
    dispatch({
      type: 'UPDATE_SORT',
      sortBy: sortBy
    })
  }

  function getMetaReviews(id) {
    axios.get(`/reviews/meta/?product_id=${id}`)
      .then((results) => {

        dispatch({
          type: 'GET_METADATA',
          payload: results.data
        })

        let absolutetotal = 0;
        let totalratings = 0;
        for (var key in results.data.ratings) {
          totalratings += Number(results.data.ratings[key])
          absolutetotal += (Number(results.data.ratings[key]) * Number(key));
        }
        let average = Math.round((absolutetotal/totalratings) * 4) / 4;

        dispatch({
          type: 'UPDATE_AVERAGE_TOTAL_RATING',
          average: average,
          total: totalratings
        })

        return average;
      })
      .catch(err => {
        console.log(err)
      });
  }

  return(<RatingsAndReviewsContext.Provider value={{
    allReviews: state.allReviews,
    meta: state.meta,
    averageRating: state.averageRating,
    totalRatings: state.totalRatings,
    sortBy: state.sortBy,
    getSort,
    updateReviewsState,
    getMetaReviews
  }}>
    {children}
  </RatingsAndReviewsContext.Provider>)
}