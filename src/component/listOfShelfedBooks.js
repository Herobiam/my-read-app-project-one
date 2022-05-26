import React from "react";
import Book from "./book";
import PropTypes from 'prop-types'

const ListOfShelfedBooks = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.bookShelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
            {props.shelfedBooks.map((book, index) =>(
                <Book
                    key={index}
                    book={book}
                    addToShelf={props.addToShelf}
                    shelf={book.shelf ? book.shelf : 'none'}
                    />
            ))}
            
        </ol>
      </div>
    </div>
  );
};

ListOfShelfedBooks.propTypes ={
    bookShelfTitle: PropTypes.string.isRequired,
    shelfedBooks: PropTypes.array.isRequired,
    addToShelf: PropTypes.func.isRequired
}

export default ListOfShelfedBooks;
