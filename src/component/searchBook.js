import React from "react";
import { Link } from "react-router-dom";
import Book from "./book";
import PropTypes from 'prop-types'

class SearchBook extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: '',
    }
  }


  onTextInput = (e) =>{
    this.setState({
      searchText: e.target.value,
    }, () =>{ this.props.findBook(e.target.value)})
  }
  render() {
    const { searchText } = this.state
    const { seachedBooks, addToShelf, shelfedBooks} = this.props

    const results = seachedBooks.map((book) =>{
       shelfedBooks.map((shelfed) =>{
         if (shelfed.id === book.id){
          book.shelf = shelfed.shelf
         }
         return shelfed;
      })
      return book;
    })
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to={'/'}>
              <button className="close-search">Close</button>
            </Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" onChange={this.onTextInput} value={searchText}/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">

              {seachedBooks.length > 0 ? (
                results.map((book, index) =>(
                  <Book
                    key={index}
                    book={book}
                    addToShelf={addToShelf}
                    shelf={book.shelf ? book.shelf : 'none'}
                    shelfedBooks={shelfedBooks}
                  />
                ))
       
              ) : (
                <li>No book found!</li>
              )}

            </ol>
          </div>
        </div>
      </div>
    );
  }
}

SearchBook.propTypes ={
  seachedBooks: PropTypes.array.isRequired,
  addToShelf: PropTypes.func.isRequired,
  shelfedBooks: PropTypes.array.isRequired
}

export default SearchBook;
