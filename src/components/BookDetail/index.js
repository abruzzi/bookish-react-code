import React, {Component} from 'react'
import ReviewList from "./ReviewList/index";

import './index.css'

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

  renderReviewList = () => {
    const {book} = this.props

    if(book.reviews) {
      return <ReviewList reviews={book.reviews} />
    }
  }

  renderReviewForm = () => {
    return (<form className="review-form">
      <input type="text" name="name" value={this.state.name} onChange={this.updateName} placeholder="Your name"/>
      <textarea name="content" cols="30" rows="10" value={this.state.content} onChange={this.updateContent} placeholder="Write your review"/>
      <button name="submit" onClick={this.saveReview}>Submit</button>
    </form>)
  }

  render() {
    const {book} = this.props

    return (<div className="detail">
      <h2 className="name">{book.name}</h2>
      <div className="description">{book.description ? book.description : book.name}</div>

      {this.renderReviewList()}
      {this.renderReviewForm()}
    </div>)
  }
}

export default BookDetail