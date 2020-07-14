import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  getGoogleBooks(title){
    return axios.get("https://www.googleapis.com/books/v1/volumes?q="+title+"+inauthor:keyes&key=AIzaSyDMsLlXeM1M2TwJgsTU7UER7tne-GMsdb0")
  }
};


//AIzaSyDMsLlXeM1M2TwJgsTU7UER7tne-GMsdb0
//GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey