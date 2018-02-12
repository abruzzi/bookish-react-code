import React from 'react'

function BookDetail({book}) {
  return (<div className="detail">
    <h2 className="name">{book.name}</h2>
    <div className="description">{book.description}</div>
  </div>)
}

export default BookDetail