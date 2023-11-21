import React, { useState, useEffect } from "react";
import "./App.css";
import BookCreateForm from "./Components/BookCreateForm";
import BookUpdateForm from "./Components/BookUpdateForm";
import BooksList from "./Components/BooksList";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import { Form, FormControl, Button } from "react-bootstrap"; // Importing Bootstrap components

function App() {
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [bookToUpdate, setBookToUpdate] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [activeTab, setActiveTab] = useState('books');

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3004/book/", {
        method: "GET",
      });
      if (!response.ok) {
        alert("response aint okey");
      }
      const responseData = await response.json();
      setBooks(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateBook = () => {
    fetchData();
    setBookToUpdate(null); // Reset the book to update
    setOpenUpdateForm(false);
  };

  const deleteBook = () => {
    fetchData();
  };

  const editBook = (book) => {
    const bookToEdit = book;
    setBookToUpdate(bookToEdit);
    setOpenUpdateForm(true);
    console.log(book);
  };

  const closeEditForm = () => {
    setOpenUpdateForm(false);
    setBookToUpdate(null);
  };

  const handleLogin = () => {
    setIsLoggedIn(true); 
  };

  const handleRegister = () => {
    setShowRegisterForm(false);
  };

  const handleRegisterClose = () => {
    setShowRegisterForm(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Library Management System</h1>
      {!isLoggedIn ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <>
          <nav className="navbar">
            <ul className="nav">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'books' ? 'active' : ''}`}
                  onClick={() => handleTabChange('books')}
                >
                  Books
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                  onClick={() => handleTabChange('users')}
                >
                  Users
                </button>
              </li>
            </ul>
          </nav>
          <div className="content">
            {activeTab === 'books' && (
              <>
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search by Title or Author"
                    className="mr-sm-2"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </Form>
                {openUpdateForm ? (
                  <BookUpdateForm
                    book={bookToUpdate}
                    fetchData={fetchData}
                    closeEditForm={closeEditForm}
                  />
                ) : (
                  <BookCreateForm addBook={addBook} fetchData={fetchData} />
                )}
                <BooksList
                  books={filteredBooks}
                  editBook={editBook}
                  deleteBook={deleteBook}
                />
              </>
            )}
            {activeTab === 'users' && (
              <>
                <Button variant="secondary" onClick={() => setShowRegisterForm(true)}>
                  Add new user
                </Button>
                {showRegisterForm && (
                  <RegisterForm handleRegister={handleRegister} handleRegisterClose={handleRegisterClose} />
                )}
                {/* Other User-related components */}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
  
  
}

export default App;
