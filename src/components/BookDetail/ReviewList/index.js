import React, { Component } from 'react';

import './index.css'

class ReviewList extends  Component {
  render () {
    const { reviews } = this.props
    return (<div className="reviews-container">
      {reviews.map(review => <div className="review" key={`${review.name}-${review.date}`}>{review.content}</div>)}
    </div>)
  }
}

export default ReviewList