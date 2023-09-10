import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [data, setData] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    imageLink: "",
    country: "",
    language: "",
    pages: "",
    year: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBookId, setEditingBookId] = useState(null);

  const getData = () => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((myjson) => {
        if (Array.isArray(myjson)) {
          setData(myjson);
        } else {
          console.error("API response is not an array:", myjson);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const addBook = (book) => {
    if (!book.title || !book.author) {
      alert("Please enter both title and author.");
      return;
    }

    const newId = Date.now().toString();

    const bookToAdd = {
      id: newId,
      ...book,
    };

    setData([...data, bookToAdd]);

    setNewBook({
      title: "",
      author: "",
      imageLink: "",
      country: "",
      language: "",
      pages: "",
      year: "",
    });

    setIsAdding(false);
  };

  const editBook = (book) => {
    if (!book.title || !book.author) {
      alert("Please enter both title and author.");
      return;
    }

    // Find the index of the book to be edited
    const bookIndex = data.findIndex((b) => b.id === editingBookId);

    if (bookIndex === -1) {
      console.error("Book not found for editing.");
      return;
    }

    // Create a copy of the data array and replace the edited book
    const newData = [...data];
    newData[bookIndex] = { id: editingBookId, ...book };

    // Update the data state with the edited book
    setData(newData);

    // Clear the edit mode and reset the editingBookId
    setIsEditing(false);
    setEditingBookId(null);
  };

  const deleteBook = (id) => {
    const newData = data.filter((book) => book.id !== id);
    setData(newData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Book List</h1>
      <div className="add-book">
        <button onClick={() => setIsAdding(!isAdding)}>Add Book</button>
        {isAdding && (
          <div className="add-book-fields">
            <h2>Add New Book</h2>
            <input
              type="text"
              placeholder="Title"
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Image Link"
              value={newBook.imageLink}
              onChange={(e) =>
                setNewBook({ ...newBook, imageLink: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Country"
              value={newBook.country}
              onChange={(e) =>
                setNewBook({ ...newBook, country: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Language"
              value={newBook.language}
              onChange={(e) =>
                setNewBook({ ...newBook, language: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Pages"
              value={newBook.pages}
              onChange={(e) =>
                setNewBook({ ...newBook, pages: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Year"
              value={newBook.year}
              onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
            />
            <button onClick={() => addBook(newBook)}>Add Book</button>
          </div>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((book) => (
            <tr key={book.id}>
              <td>
                {isEditing && editingBookId === book.id ? (
                  <input
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={(e) =>
                      setNewBook({ ...newBook, title: e.target.value })
                    }
                  />
                ) : (
                  book.title
                )}
              </td>
              <td>
                {isEditing && editingBookId === book.id ? (
                  <input
                    type="text"
                    name="author"
                    value={newBook.author}
                    onChange={(e) =>
                      setNewBook({ ...newBook, author: e.target.value })
                    }
                  />
                ) : (
                  book.author
                )}
              </td>
              <td>
                {isEditing && editingBookId === book.id ? (
                  <button onClick={() => editBook(newBook)}>
                    Save Changes
                  </button>
                ) : (
                  <>
                    <Link to={`/book/${book.id}`} className="details-button">
                      View Details
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() => deleteBook(book.id)}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(!isEditing);
                        setEditingBookId(book.id);
                      }}
                      className={`edit-button ${
                        isEditing && editingBookId === book.id
                          ? "cancel-button"
                          : ""
                      }`}
                    >
                      {isEditing && editingBookId === book.id
                        ? "Cancel"
                        : "Edit"}
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;

