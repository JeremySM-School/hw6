"use strict";
const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController'); 

router.get("/:id", userController.fetchUserById);
router.post("/", userController.createUser);
router.delete("/:id", userController.removeUser);

module.exports = router;