import React, { Component } from 'react';

import axios from 'axios'
import BookList from './BookList'

class BookListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      loading: true,
      error: null
    }
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

  render() {
    return <BookList {...this.state} />
  }
}

export default BookListContainer