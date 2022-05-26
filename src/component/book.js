import React from "react";
import PropTypes from 'prop-types';

const Book = (props) => {

  const moveTo = (e) => {
      props.addToShelf(props.book, e.target.value)
  }

  return props.book ?(
    <li key={props.book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${
                props.book.imageLinks
                  ? props.book.imageLinks.thumbnail
                  : 'http://via.placeholder.com/128x193?text=No%20Cover'
              }")`,
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={moveTo} value={props.shelf}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{props.book.authors}</div>
      </div>
    </li>
  ) : (
    <p>No book on this shelf</p>
  );
};

Book.propTypes ={
  addToShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
  shelf: PropTypes.string.isRequired
}

export default Book;
