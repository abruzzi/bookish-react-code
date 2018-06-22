import React, { Component } from 'react';

import './index.css'

class ReviewList extends  Component {
  render () {
    const { reviews } = this.props
    return (<div className="reviews-container">
      {reviews.map(review => <div className="review" key={`${review.name}-${review.date}`}>
        <div>
          <span className="name">{review.name}</span>
          <span className="date">{review.date}</span>
        </div>
        <p>{review.content}</p>
      </div>)}
    </div>)
  }
}

export default ReviewList