const express = require("express");
const router = express.Router();
const authController = require("../Controller/auth.controller");

router.post("/createadmin", authController.createAdmin);
router.post("/adminlogin", authController.adminLogin);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
