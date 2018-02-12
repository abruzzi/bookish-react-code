import React, {Component} from 'react'
import axios from 'axios'

import BookDetail from './BookDetail'

class BookDetailContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: {}
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios.get(`http://localhost:8080/books/${id}`).then((res) => {
      this.setState({
        book: res.data
      })
    })
  }

  render() {
    return <BookDetail {...this.state}/>
  }
}

export default BookDetailContainer