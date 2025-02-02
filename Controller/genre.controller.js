const Genre = require('../Model/gener');

exports.createGenre = async (req, res) => {
  try {
    const { name, description } = req.body;
    const genre = new Genre({ name, description });
    await genre.save();
    res.status(201).json({ genre });
  } catch (error) {
    res.status(500).json({ message: "Error creating genre", error });
  }
};

exports.getGenres = async (req, res) => {
  try {
    const genres = await Genre.find().populate('books'); // Populate books if you need detailed book data
    res.status(200).json({ genres });
  } catch (error) {
    res.status(500).json({ message: "Error fetching genres", error });
  }
};

exports.getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id).populate('books');
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }
    res.status(200).json({ genre });
  } catch (error) {
    res.status(500).json({ message: "Error fetching genre", error });
  }
};

exports.updateGenre = async (req, res) => {
  try {
    const { name, description } = req.body;
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }
    res.status(200).json({ genre });
  } catch (error) {
    res.status(500).json({ message: "Error updating genre", error });
  }
};

exports.deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }
    res.status(200).json({ message: "Genre deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting genre", error });
  }
};
