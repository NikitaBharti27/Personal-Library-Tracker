const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  const { title, author, genre, status } = req.body;
  const cover = req.file ? `/uploads/${req.file.filename}` : undefined;
  const book = await Book.create({
    user: req.user._id,
    title,
    author,
    genre,
    status,
    cover
  });
  res.status(201).json(book);
};

exports.getBooks = async (req, res) => {
  const { status, author, title } = req.query;
  const query = { user: req.user._id };
  if (status) query.status = status;
  if (author) query.author = new RegExp(author, 'i');
  if (title) query.title = new RegExp(title, 'i');
  const books = await Book.find(query).sort({ createdAt: -1 });
  res.json(books);
};

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, status } = req.body;
  const cover = req.file ? `/uploads/${req.file.filename}` : undefined;
  const book = await Book.findOne({ _id: id, user: req.user._id });
  if (!book) return res.status(404).json({ message: 'Book not found' });

  book.title = title || book.title;
  book.author = author || book.author;
  book.genre = genre || book.genre;
  book.status = status || book.status;
  if (cover) book.cover = cover;

  await book.save();
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findOneAndDelete({ _id: id, user: req.user._id });
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json({ message: 'Book deleted' });
};
