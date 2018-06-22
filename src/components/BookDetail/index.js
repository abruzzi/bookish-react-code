import React from 'react'
import ReviewList from "./ReviewList/index";

function BookDetail({book}) {
  return (<div className="detail">
    <h2 className="name">{book.name}</h2>
    <div className="description">{book.description ? book.description : book.name}</div>
    {book.reviews && <ReviewList reviews={book.reviews} />}
  </div>)
}

export default BookDetail