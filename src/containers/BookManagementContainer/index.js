import React from 'react';
import _ from 'lodash';

class BookManagementContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
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

  render() {
    const {authors} = this.state;

    return (<div>
      <form className="book-detail">
        <h2>Book Management</h2>

        <h3>Basic information</h3>
        <input type="text" className="name" placeholder="Book Name" onChange={this.updateBookName} />
        <input type="text" className="description" placeholder="Book Description" onChange={this.updateBookDescription} />

        <h3>Authors</h3>
        {
          authors.map(author => (<div key={author.id}>
            <input type="text" className="author-name" placeholder="Author Name"/>
            <input type="text" className="author-profile" placeholder="Author Profile"/>
          </div>))
        }

        <button className="add" onClick={() => this.addAuthor()}>Add</button>
      </form>
    </div>);
  }
}

export default BookManagementContainer;