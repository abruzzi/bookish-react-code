import React from 'react'
import ReviewList from "./ReviewList/index";

function BookDetail({book}) {
  return (<div className="detail">
    <h2 className="name">{book.name}</h2>
    <div className="description">{book.description ? book.description : book.name}</div>
    <form>
      <input type="text" name="name"/>
      <textarea name="content" cols="30" rows="10" />
      <button name="submit">Submit</button>
    </form>
    {book.reviews && <ReviewList reviews={book.reviews} />}
  </div>)
}

export default BookDetail