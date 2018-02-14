import React from "react";
import "./App.css";
import BookListContainer from "./containers/BookListContainer/"
import BookDetailContainer from './containers/BookDetailContainer/'

import {Route} from 'react-router-dom'

function App() {
  return (
    <div className="container">
      <h1>Bookish</h1>
      <main>
        <Route exact path="/" component={BookListContainer} />
        <Route path="/books/:id" component={BookDetailContainer} />
      </main>
    </div>
  )
}

export default App;
