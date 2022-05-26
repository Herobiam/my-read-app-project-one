import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBook from "./component/searchBook";
import MyReadings from "./component/myReadings";
import { Route, } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    shelfedBooks: [],
    seachedBooks: [],
  };

  shelves = [  
    {
      id: 'currentlyReading',
      title: 'Currently Reading',
    },
    {
      id: 'wantToRead',
      title: 'Want to Read',
    },
    {
      id: 'read',
      title: 'Read',
    },
  ]

  searchBook = (searchText) =>{

    if(searchText.length > 0){
      BooksAPI.search(searchText).then((books) =>{
        if(books && !books.error){
          this.setState({
            seachedBooks: books
          });
        } else {
          this.setState({
            seachedBooks: []
          });
        }
      }).catch((e) =>{
        this.setState({
          seachedBooks: []
        });
      })
    }else{
      this.setState({
        searchBook: []
      })
    }

  }

  addToShelf = (book, shelf) =>{
    var shelfedBooks = this.state.shelfedBooks.filter((b) => b.id !== book.id)
    BooksAPI.update(book, shelf).then(() =>{
      
    }).catch((e)=>{
      return e
    })

    if(shelf !== 'none'){
      book.shelf = shelf
      shelfedBooks = [...shelfedBooks, book]
    }
    
    this.setState({
      shelfedBooks
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        shelfedBooks: books,
      }));
    });
  }

  render() {
    const { shelfedBooks } = this.state
    return (
      <div className="app">

        <Route exact path={'/'} render={() =>(
          <MyReadings
            shelves={this.shelves}
            addToShelf={this.addToShelf}
            shelfedBooks={shelfedBooks}
          />
        )}/>
        <Route exact path={'/search'} render={() =>(
          <SearchBook
            seachedBooks={this.state.seachedBooks}
            findBook={this.searchBook}
            addToShelf={this.addToShelf}
            shelfedBooks={shelfedBooks}
          />
        )}/>

      </div>
    );
  }
}

export default BooksApp;
