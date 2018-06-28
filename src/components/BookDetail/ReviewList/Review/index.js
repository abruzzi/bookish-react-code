import React, { Component } from 'react'

import { connect } from 'react-redux'

import { updateReview } from '../../../../containers/actions'

export class Review extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      content: ''
    }
  }

  edit = () => {
    const { content } = this.props.review
    this.setState({
      editing: true,
      content: content
    })
  }

  submit = () => {
    this.setState({
      editing: false
    })
    const { id, bookId, name, date } = this.props.review
    const content = this.state.content
    this.props.updateReview(id, {
      bookId, name, date, content
    })
  }

  updateContent = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  render() {
    const {review} = this.props
    return (<div className="review">
      <div>
        <span className="name">{review.name}</span>
        <span className="date">{review.date}</span>
      </div>
      {this.state.editing ?
        <textarea value={this.state.content} cols="30" rows="10" className="review-content" onChange={this.updateContent}/>:
        <p>{review.content}</p>}
      {this.state.editing ?
        <button className="submit" onClick={this.submit}>Submit</button>:
        <button className="edit" onClick={this.edit}>Edit</button>}
    </div>)
  }
}

export default connect(null, { updateReview })(Review)