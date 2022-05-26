import React from "react";
import { Link } from "react-router-dom";
import ListOfShelfedBooks from "./listOfShelfedBooks";
import PropTypes from 'prop-types'



const MyReadings = (props) => {
  return (
    <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>

            {props.shelves.map((shelf, index)=>(
              <ListOfShelfedBooks
                key={index}
                bookShelfTitle={shelf.title}
                shelfedBooks={props.shelfedBooks.filter((book) => book.shelf === shelf.id)}
                addToShelf={props.addToShelf}
               />
            ))}
          </div>
        </div>
        <div className="open-search">
        <Link to={'/search'}>
          <button>
            Add a book
          </button>
        </Link> 
        </div>
      </div>
    </div>
  );
};

MyReadings.propTypes ={
  shelfedBooks: PropTypes.array.isRequired,
  addToShelf: PropTypes.func.isRequired
}

export default MyReadings;
