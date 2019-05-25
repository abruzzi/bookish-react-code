import React from 'react';
import _ from 'lodash';

class BookManagementContainer extends React.Component {
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

  addAuthor = () => {
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

  updateAuthorName = (id, e) => {
    const {authors} = this.state;
    const author = authors.find(author => author.id === id);
    author.name = e.target.value;
    this.setState({authors});
  }

  updateAuthorProfile = (id, e) => {
    const {authors} = this.state;
    const author = authors.find(author => author.id === id);
    author.profile = e.target.value;
    this.setState({authors});
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
        {
          authors.map(author => (<div key={author.id}>
            <input type="text" className="author-name" value={author.name} placeholder="Author Name" onChange={(e) => this.updateAuthorName(author.id, e)} />
            <input type="text" className="author-profile" value={author.profile} placeholder="Author Profile" onChange={(e) => this.updateAuthorProfile(author.id, e)} />
            <button className="delete-author" disabled={true}>Delete</button>
          </div>))
        }

        <button className="add" onClick={() => this.addAuthor()}>Add</button>
      </form>
    </div>);
  }
}

export default BookManagementContainer;