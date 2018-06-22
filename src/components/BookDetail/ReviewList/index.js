import React, { Component } from 'react';

import './index.css'

import Review from './Review'

const ReviewList = ({reviews}) => {
  return (<div className="reviews-container">
    {reviews.map(review => <Review review={review} key={`${review.name}-${review.date}`} />)}
  </div>)
}

export default ReviewList