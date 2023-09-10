import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './BookDetail.css';
function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`/data.json?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((myjson) => {
        const selectedBook = myjson.find((item) => item.id === id);
        if (selectedBook) {
          setBook(selectedBook);
        } else {
          console.error('Book not found with ID:', id);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  return (
    <div className="BookDetail">
      {book ? (
        <>
          <h1>{book.title}</h1>
          <img src={book.imageLink} alt="Image" />
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Country:</strong> {book.country}</p>
          <p><strong>Language:</strong> {book.language}</p>
          <p><strong>Pages:</strong> {book.pages}</p>
          <p><strong>Year:</strong> {book.year}</p>
          <Link to="/">Back to Book List</Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BookDetail;




