import React, { useState, useEffect } from "react";
import "./App.css";
import BookCreateForm from "./Components/BookCreateForm";
import BookUpdateForm from "./Components/BookUpdateForm";
import BooksList from "./Components/BooksList";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import UserList from "./Components/UserList";
import UserUpdateForm from "./Components/UserUpdateForm";
import { Form, FormControl, Button } from "react-bootstrap"; // Importing Bootstrap components


function App() {
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [bookToUpdate, setBookToUpdate] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [activeTab, setActiveTab] = useState('books');
  const [users, setUsers] = useState([]);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [lentBooks, setLentBooks] = useState([]);

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

  const fetchLentBooks = async () => {
    try {
      const response = await fetch("http://localhost:3004/book/lent", {
        method: "GET",
      });
      if (!response.ok) {
        alert("Lent books response not okay");
      }
      const responseData = await response.json();
      console.log(responseData);
      setLentBooks(responseData);
    } catch (error) {
      console.error(error);
    }
    //setLentBooks([]);
  };

  const fetchDataForUsers = async () => {
    try {
      const response = await fetch('http://localhost:3004/user/', {
        method: 'GET',
      });
      if (!response.ok) {
        alert('response not okay');
      }
      const responseData = await response.json();
      setUsers(responseData);
      console.log(setUsers);
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
    fetchDataForUsers();
  };

  const handleRegisterClose = () => {
    setShowRegisterForm(false);
    fetchDataForUsers();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const updateUser = async () => {
    fetchDataForUsers();
  };

  const deleteUser = async (userId) => {
    fetchDataForUsers();
  };

  const editUser = (user) => {
    setUserToUpdate(user);
    // Open the user update form
  };

  const closeEditUserForm = () => {
    setUserToUpdate(null);
    // Close the user update form
  };

  useEffect(() => {
    fetchData();
    fetchDataForUsers();
    fetchLentBooks();
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
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'lentBooks' ? 'active' : ''}`}
                  onClick={() => handleTabChange('lentBooks')}
                >
                  Lent Books
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
                    updateBook={updateBook}
                  />
                ) : (
                  <BookCreateForm addBook={addBook} fetchData={fetchData} />
                )}
                <BooksList
                  books={filteredBooks}
                  editBook={editBook}
                  deleteBook={deleteBook}
                  updateBook={updateBook}
                />
              </>
            )}
            {activeTab === 'users' && (
              <>
                <Button variant="secondary" onClick={() => setShowRegisterForm(true)}>
                  Add new user
                </Button>
                {showRegisterForm && (
                  <RegisterForm handleRegister={handleRegister} handleRegisterClose={handleRegisterClose} fetchDataForUsers={fetchDataForUsers} />
                )}
                {userToUpdate && (
                  <UserUpdateForm
                    user={userToUpdate}
                    fetchDataForUsers={fetchDataForUsers}
                    updateUser={updateUser}
                    closeEditUserForm={closeEditUserForm}
                  />
                )}
                <UserList
                  users={users} // Pass the users array to the UserList component
                  editUser={editUser} // Pass the editUser function to the UserList component
                  deleteUser={deleteUser} // Pass the deleteUser function to the UserList component
                />
              </>
            )}
            {activeTab === 'lentBooks' && (
              <BooksList
              books={filteredBooks}
              editBook={editBook}
              deleteBook={deleteBook}
              updateBook={updateBook}
            />
            )}
          </div>
        </>
      )}
    </div>
  );
  
}

export default App;