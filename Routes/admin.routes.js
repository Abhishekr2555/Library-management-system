const express = require("express");
const router = express.Router();
const adminController = require("../Controller/admin.controller");
const { verifyAdmin } = require("../Middleware/verifytoken");

router.get("/userDetails", verifyAdmin, adminController.getAllUsers);
router.get("/bookDetails", verifyAdmin, adminController.getAllBooks);


module.exports = router;
