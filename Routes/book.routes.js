const express = require('express');
const router = express.Router();
const bookController=require('../Controller/book.controller')

router.post('/addbook/',bookController.addBook)
router.get('/getbook/',bookController.getBook)
router.get('/getbook/:id',bookController.getBookById)
router.put('/addbook/:id',bookController.updateBook)
router.delete('/deletebook/:id',bookController.deleteBook)

module.exports = router