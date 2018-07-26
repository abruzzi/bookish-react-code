import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SearchBox from '../../components/SearchBox/'
import BookList from '../../components/BookList/'

import {setSearchTerm, fetchBooks} from '../../redux/actions/actions'

export class BookListContainer extends Component {
  constructor(props) {
    super(props)
    this.filterBook = this.filterBook.bind(this)
  }

  componentDidMount() {
    this.props.fetchBooks()
  }

  filterBook(e) {
    this.props.setSearchTerm(e.target.value)
    this.props.fetchBooks()
  }

  render() {
    return (
      <div>
        <SearchBox term={this.props.term} onChange={this.filterBook} />
        <BookList {...this.props}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  books: state.books,
  error: state.errors.error,
  term: state.search.term
})

const mapDispatchToProps = dispatch => bindActionCreators({
  setSearchTerm,
  fetchBooks
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BookListContainer)