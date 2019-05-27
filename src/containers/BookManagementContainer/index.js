import React from 'react';
import _ from 'lodash';

import './index.css'
import {connect} from "react-redux";
import {saveBook} from "../../redux/actions/actions";

export class BookManagementContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      authors: [
        {id: _.uniqueId('author_'), name: '', profile: ''}
      ]
    }
  }

  addAuthor = (e) => {
    e.preventDefault();

    const {authors} = this.state;

    this.setState({
      authors: [...authors, {id: _.uniqueId('author_'), name: '', profile: ''}]
    })
  }

  updateBookName = (e) => {
    const name = e.target.value;
    this.setState({ name })
  }

  updateBookDescription = (e) => {
    const description = e.target.value;
    this.setState({ description })
  }

  updateAuthor = (id, e, key) => {
    const {authors} = this.state;
    const author = authors.find(author => author.id === id);
    author[key] = e.target.value;
    this.setState({authors});
  }

  deleteAuthor = (id, e) => {
    e.preventDefault();
    const {authors} = this.state;
    _.remove(authors, author => author.id === id)
    this.setState({authors});
  }

  saveBookInfo = (e) => {
    e.preventDefault();
    this.props.saveBook({
      ...this.state
    });
  }

  render() {
    const {authors} = this.state;

    return (<div>
      <form className="book-detail">
        <h2>Book Management</h2>

        <h3>Basic information</h3>
        <input type="text" className="name" value={this.state.name} placeholder="Book Name" onChange={this.updateBookName} />
        <input type="text" className="description" value={this.state.description} placeholder="Book Description" onChange={this.updateBookDescription} />

        <h3>Authors</h3>
        <button className="add" onClick={this.addAuthor}>Add</button>
        {
          authors.map(author => (<div key={author.id}>
            <input type="text" className="author-name" value={author.name} placeholder="Author Name" onChange={(e) => this.updateAuthor(author.id, e, 'name')} />
            <input type="text" className="author-profile" value={author.profile} placeholder="Author Profile" onChange={(e) => this.updateAuthor(author.id, e, 'profile')} />
            <button className="delete-author" disabled={authors.length <= 1} onClick={(e) => this.deleteAuthor(author.id, e)}>Delete</button>
          </div>))
        }

        <button className="save-book" onClick={(e) => this.saveBookInfo(e)}>Save</button>
      </form>
    </div>);
  }
}

export default connect(null, {saveBook})(BookManagementContainer);