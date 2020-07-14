import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { set } from "mongoose";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    //console.log(formObject.title)
    if (formObject.title) {
      API.getGoogleBooks(
   formObject.title)
        .then(res =>{ 
          //console.log(res.data.items)
          setBooks(res.data.items)})
        .catch(err => console.log(err));
    }
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
             
              <FormBtn
                disabled={!(formObject.title)}
                onClick={handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem 
                  key={book.id}
                  title={book.volumeInfo.title}
                  authors={book.volumeInfo.authors}
                  link={book.volumeInfo.infoLink}
                  description={book.volumeInfo.description}
                  image={book.volumeInfo.imageLinks}
                  >
                    
                    <Link to={"/books/" + book.id}>
                      <strong>
                        {book.id} by {console.log(book)}

                        {/* Error: Objects are not valid as a React child (found: object with keys {title, subtitle, authors, publisher, 
                        publishedDate, description, industryIdentifiers, readingModes, pageCount, printType, categories, averageRating, 
                        ratingsCount, maturityRating, allowAnonLogging, contentVersion, panelizationSummary, imageLinks, language, previewLink, infoLink, 
                          canonicalVolumeLink}). If you meant to render a collection of children, use an array instead. */}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => deleteBook(book.id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Books;
