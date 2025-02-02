"use client";
import { useState, useEffect } from "react";

const BookManager = () => {
  const [booksData, setBooksData] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [showForm, setShowForm] = useState(false); // Toggle form
  const [newBook, setNewBook] = useState({
    bookName: "",
    bookDescription: "",
    bookAuthor: "",
    bookCategory: "",
    bookImage: "",
    bookStatus: "",
    bookCost: "",
  });

  useEffect(() => {
    fetch("http://localhost:8800/api/book/getbook/")
      .then((response) => response.json())
      .then((data) => setBooksData(data))
      .catch((error) => console.error("Error fetching books:", error));

    fetch("http://localhost:8800/api/author")
      .then((response) => response.json())
      .then((data) => setAuthors(data))
      .catch((error) => console.error("Error fetching authors:", error));

    fetch("http://localhost:8800/api/genre")
      .then((response) => response.json())
      .then((data) => setGenres(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8800/api/book/addbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    })
      .then((response) => response.json())
      .then((data) => {
        setBooksData((prevData) => [...prevData, data]);
        setNewBook({
          bookName: "",
          bookDescription: "",
          bookAuthor: "",
          bookCategory: "",
          bookImage: "",
          bookStatus: "",
          bookCost: "",
        });
        setShowForm(false); // Close form after submission
      })
      .catch((error) => console.error("Error adding book:", error));
  };

  const handleDelete = (bookId) => {
    fetch(`http://localhost:8800/api/book/deletebook/${bookId}`, {
      method: "DELETE",
    })
      .then(() => {
        setBooksData((prevData) =>
          prevData.filter((book) => book._id !== bookId)
        );
      })
      .catch((error) => console.error("Error deleting book:", error));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-4">Book Manager</h2>

      {/* Add Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 p-3 bg-blue-600 text-white rounded-lg"
      >
        {showForm ? "Close Form" : "Add New Book"}
      </button>

      {/* Toggle Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8 max-w-xl mx-auto"
        >
          <h3 className="text-xl font-medium mb-6">Add or Update Book</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="bookName"
              value={newBook.bookName}
              onChange={handleChange}
              placeholder="Book Name"
              className="w-full p-3 border rounded-lg"
            />
            <textarea
              name="bookDescription"
              value={newBook.bookDescription}
              onChange={handleChange}
              placeholder="Book Description"
              className="w-full p-3 border rounded-lg"
            />
            <select
              name="bookAuthor"
              value={newBook.bookAuthor}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select Author</option>
              {authors.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="bookImage"
              value={newBook.bookImage}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="text"
              name="bookStatus"
              value={newBook.bookStatus}
              onChange={handleChange}
              placeholder="Book Status"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="number"
              name="bookCost"
              value={newBook.bookCost}
              onChange={handleChange}
              placeholder="Cost"
              className="w-full p-3 border rounded-lg"
            />
            <button
              type="submit"
              className="w-full p-3 bg-green-600 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {booksData.map((book) => (
          <div
            key={book._id}
            className="bg-white border rounded-lg shadow-md p-6"
          >
            <img
              src={book.bookImage}
              alt={book.bookName}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold">{book.bookName}</h3>
            <p className="text-sm text-gray-700">{book.bookDescription}</p>
            <p className="text-sm text-gray-500">Status: {book.bookStatus}</p>
            <p className="text-xl font-semibold text-gray-800">
              ${book.bookCost}
            </p>
            <button
              onClick={() => handleDelete(book._id)}
              className="mt-4 w-full p-3 bg-red-500 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookManager;
