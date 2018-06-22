import React, {Component} from 'react'
import ReviewList from "./ReviewList/index";

class BookDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      content: ''
    }
  }

  updateName = (e) => {
    this.setState({name: e.target.value})
  }

  updateContent = (e) => {
    this.setState({content: e.target.value})
  }

  saveReview = (e) => {
    e.preventDefault()
    const id = this.props.book.id
    this.props.saveReview(id, {
      name: this.state.name,
      content: this.state.content
    })
  }

  render() {
    const {book} = this.props

    return (<div className="detail">
      <h2 className="name">{book.name}</h2>
      <div className="description">{book.description ? book.description : book.name}</div>
      <form>
        <input type="text" name="name" value={this.state.name} onChange={this.updateName} />
        <textarea name="content" cols="30" rows="10" value={this.state.content} onChange={this.updateContent} />
        <button name="submit" onClick={this.saveReview}>Submit</button>
      </form>
      {book.reviews && <ReviewList reviews={book.reviews} />}
    </div>)
  }
}

export default BookDetail