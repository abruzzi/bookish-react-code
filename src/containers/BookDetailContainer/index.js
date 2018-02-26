import React, {Component} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {fetchABook} from '../actions'
import BookDetail from '../../components/BookDetail/index'

class BookDetailContainer extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchABook(id)
  }

  render() {
    return <BookDetail {...this.props}/>
  }
}

const mapStateToProps = state => ({
  book: state.list.current
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchABook
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailContainer)