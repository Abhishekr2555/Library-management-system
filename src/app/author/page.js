"use client";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const AuthorManager = () => {
  const [authorsData, setAuthorsData] = useState([]);
  const [newAuthor, setNewAuthor] = useState({
    name: "",
    bio: "",
    birthdate: "",
    books: [],
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAuthorId, setEditingAuthorId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8800/api/author")
      .then((response) => response.json())
      .then((data) => setAuthorsData(data))
      .catch((error) => console.error("Error fetching authors:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAuthor({ ...newAuthor, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestConfig = {
      method: isEditMode ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAuthor),
    };

    const url = isEditMode
      ? `http://localhost:8800/api/author/${editingAuthorId}`
      : "http://localhost:8800/api/author";

    fetch(url, requestConfig)
      .then((response) => response.json())
      .then((data) => {
        if (isEditMode) {
          setAuthorsData((prevData) =>
            prevData.map((author) =>
              author._id === editingAuthorId ? data : author
            )
          );
        } else {
          setAuthorsData((prevData) => [...prevData, data]);
        }
        resetForm();
      })
      .catch((error) => console.error("Error submitting author:", error));
  };

  const handleDelete = (authorId) => {
    fetch(`http://localhost:8800/api/author/${authorId}`, {
      method: "DELETE",
    })
      .then(() => {
        setAuthorsData((prevData) =>
          prevData.filter((author) => author._id !== authorId)
        );
      })
      .catch((error) => console.error("Error deleting author:", error));
  };

  const handleEdit = (author) => {
    setNewAuthor({
      name: author.name,
      bio: author.bio,
      birthdate: author.birthdate,
      books: author.books,
    });
    setIsEditMode(true);
    setEditingAuthorId(author._id);
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setNewAuthor({ name: "", bio: "", birthdate: "", books: [] });
    setIsEditMode(false);
    setEditingAuthorId(null);
    setIsFormOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Author Manager</h2>

      {/* Add Author Button */}
      <button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {isFormOpen ? <FaTimes className="mr-2" /> : <FaPlus className="mr-2" />}
        {isFormOpen ? "Close Form" : "Add Author"}
      </button>

      {/* Author Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 border rounded shadow-md">
          <h3 className="text-xl font-medium mb-4">{isEditMode ? "Edit Author" : "Add Author"}</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={newAuthor.name}
              onChange={handleChange}
              placeholder="Author Name"
              className="w-full p-2 border rounded"
            />
            <textarea
              name="bio"
              value={newAuthor.bio}
              onChange={handleChange}
              placeholder="Author Bio"
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              name="birthdate"
              value={newAuthor.birthdate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded"
            >
              {isEditMode ? "Update Author" : "Submit"}
            </button>
          </div>
        </form>
      )}

      {/* Authors List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {authorsData.map((author) => (
          <div key={author._id} className="border rounded shadow-md p-4 relative">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{author.name}</h3>
              <div className="flex gap-2">
                {/* Edit Icon */}
                <button onClick={() => handleEdit(author)} className="text-yellow-500 hover:text-yellow-700">
                  <FaEdit />
                </button>
                {/* Delete Icon */}
                <button onClick={() => handleDelete(author._id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="text-sm mt-2">{author.bio}</p>
            <p className="text-sm text-gray-600">Birthdate: {author.birthdate}</p>
            <p className="text-sm text-gray-600">Books: {author.books.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorManager;
