import React, { Component } from 'react'

class Review extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  edit = () => {
    this.setState({
      editing: true
    })
  }

  submit = () => {
    this.setState({
      editing: false
    })
  }

  render() {
    const {review} = this.props
    return (<div className="review">
      <div>
        <span className="name">{review.name}</span>
        <span className="date">{review.date}</span>
      </div>
      {this.state.editing ? <textarea value={review.content} /> : <p>{review.content}</p>}
      {this.state.editing ?
        <button className="submit" onClick={this.submit}>Submit</button>:
        <button className="edit" onClick={this.edit}>Edit</button>}
    </div>)
  }
}

export default Review