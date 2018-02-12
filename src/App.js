import React, { Component } from 'react';
import './App.css';

class App extends Component {
  renderBooks(books) {
    return (<div className="books">
      {
        books.map(book => {
          return (<div className="book">
            <h2 className="title">{book.name}</h2>
          </div>)
        })
      }
    </div>)
  }

  render() {
    const books = [{ name: 'Refactoring' }, { name: 'Domain-driven design' }]
    return (
      <div className="App">
        <h1>Bookish</h1>
        {this.renderBooks(books)}
      </div>
    );
  }
}

export default App;
