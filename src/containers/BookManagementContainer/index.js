import React from 'react';

const BookManagementContainer = () => (<div>
  <form className="book-detail">
    <h2>Book Management</h2>
    <h3>Basic information</h3>
    <input type="text" className="name" placeholder="Book Name"/>
    <input type="text" className="description" placeholder="Book Description"/>

    <h3>Authors</h3>
    <input type="text" className="author-name" placeholder="Author Name"/>
    <input type="text" className="author-profile" placeholder="Author Profile"/>
  </form>
</div>);

export default BookManagementContainer;