import React, {Component} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {fetchABook, saveReview} from '../../redux/actions/actions'
import BookDetail from '../../components/BookDetail/index'

export class BookDetailContainer extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchABook(id)
  }

  render() {
    return <BookDetail {...this.props}/>
  }
}

const mapStateToProps = state => ({
  book: state.detail
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchABook,
  saveReview
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailContainer)