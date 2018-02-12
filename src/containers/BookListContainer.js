import React, { Component } from 'react';

import axios from 'axios'
import BookList from '../components/BookList/index'

class BookListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      loading: true,
      error: null,
      term: ''
    }
    this.filterBook = this.filterBook.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:8080/books').then(res => {
      this.setState({
        books: res.data,
        loading: false
      })
    }).catch(err => {
      this.setState({
        loading: false,
        error: err
      })
    })
  }

  filterBook(e) {
    this.setState({
      term: e.target.value
    })

    axios.get(`http://localhost:8080/books?q=${e.target.value}`).then(res => {
      this.setState({
        books: res.data,
        loading: false
      })
    }).catch(err => {
      this.setState({
        loading: false,
        error: err
      })
    })
  }

  render() {
    return (
      <div>
        <input type="text" className="search" placeholder="Type to search" onChange={this.filterBook}
               value={this.state.term}/>
        <BookList {...this.state}/>
      </div>
    )
  }
}

export default BookListContainer