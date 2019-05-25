import React from 'react';
import _ from 'lodash';

class BookManagementContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    return (<div>
      <form className="book-detail">
        <h2>Book Management</h2>
        <h3>Basic information</h3>
        <input type="text" className="name" placeholder="Book Name"/>
        <input type="text" className="description" placeholder="Book Description"/>

        <h3>Authors</h3>
        {
          this.state.authors.map(author => (<div key={author.id}>
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