import React, { Component } from 'react';
import './App.css';

import BookList from './BookList'

class App extends Component {
  render() {
    const books = [{ name: 'Refactoring' }, { name: 'Domain-driven design' }]
    return (
      <div className="App">
        <h1>Bookish</h1>
        <BookList books={books} />
      </div>
    );
  }
}

export default App;
