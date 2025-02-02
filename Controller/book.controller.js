const mongoose = require("mongoose");
const Book = require("../Model/book");
const User = require("../Model/user");
const Author = require("../Model/author");
exports.addBook = async (req, res) => {
  const {
    bookName,
    bookDescription,
    bookAuthor,
    bookImage,
    bookStatus,
    bookCost,
  } = req.body;

  try {
    // Find the author by name
    const author = await Author.findOne({
      name: {
        $regex: new RegExp(`^${bookAuthor}$`, "i"), // 'i' for case-insensitive search
      },
    });

    console.log(author);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    // Create the new book and associate it with the found author's ObjectId
    const newBook = await Book.create({
      bookName,
      bookDescription,
      bookAuthor: author._id, // Use the author's ObjectId
      bookImage,
      bookStatus,
      bookCost,
      isActive: true,
    });

    res.status(201).json(newBook); // Return the created book
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Create Book" });
  }
};

exports.getBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch books" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch book" });
  }
};

exports.updateBook = async (req, res) => {
  const {
    bookName,
    bookDescription,
    bookAuthor,
    bookImage,
    bookStatus,
    bookCost,
  } = req.body;

  try {
    const author = await Author.findOne({ name: bookAuthor });
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        bookName,
        bookDescription,
        bookAuthor: author._id,
        bookImage,
        bookStatus,
        bookCost,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update book" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const data = await Book.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete book" });
  }
};
