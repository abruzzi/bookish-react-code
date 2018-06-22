import React, { Component } from 'react';

class ReviewList extends  Component {
  render () {
    const { reviews } = this.props
    return (<div className="reviews-container">
      {reviews.map(review => <div className="review"></div>)}
    </div>)
  }
}

export default ReviewList