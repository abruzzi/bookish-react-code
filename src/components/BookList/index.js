import React from 'react'
import './index.css'

function BookList({loading, error, books}) {
  if(loading) {
    return <div className="loading" />
  }

  if(error) {
    return <div className="error" />
  }

  return (<div className="books">
    {
      books.map(book => {
        return (<div className="book" key={book.id}>
          <h2 className="title">{book.name}</h2>
          <a href={`/books/${book.id}`} className="view-detail">View Detail</a>
        </div>)
      })
    }
  </div>)
}

export default BookList