const express = require('express');
const multer = require('multer');
const { createBook, getBooks, updateBook, deleteBook } = require('../controllers/bookController');
const protect = require('../middleware/auth');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/', protect, upload.single('cover'), createBook);
router.get('/', protect, getBooks);
router.put('/:id', protect, upload.single('cover'), updateBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;
