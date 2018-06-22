import React from 'react'

const Review = ({review}) => {
  return (<div className="review">
    <div>
      <span className="name">{review.name}</span>
      <span className="date">{review.date}</span>
    </div>
    <p>{review.content}</p>
  </div>)
}

export default Review