const Author = require("../Model/author");

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching authors", error });
  }
};
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: "Error fetching author", error });
  }
};
exports.createAuthor = async (req, res) => {
  try {
    const { name, bio, birthdate } = req.body;
    const newAuthor = new Author({ name, bio, birthdate });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: "Error creating author", error });
  }
};
exports.updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAuthor)
      return res.status(404).json({ message: "Author not found" });
    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ message: "Error updating author", error });
  }
};
exports.deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor)
      return res.status(404).json({ message: "Author not found" });
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting author", error });
  }
};
