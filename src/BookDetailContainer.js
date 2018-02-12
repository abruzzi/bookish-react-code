import React, {Component} from 'react'
import axios from 'axios'

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
    const {book} = this.state
    return (<div className="detail">
      <div className="description">{book.description}</div>
    </div>)
  }
}

export default BookDetailContainer