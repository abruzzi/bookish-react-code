import React, { Component } from 'react';

import './index.css'

import Review from './Review'

class ReviewList extends  Component {
  render () {
    const { reviews } = this.props
    return (<div className="reviews-container">
      {reviews.map(review => <Review review={review} key={`${review.name}-${review.date}`} />)}
    </div>)
  }
}

export default ReviewList