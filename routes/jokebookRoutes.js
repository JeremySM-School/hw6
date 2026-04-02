"use strict";
const express = require('express');
const router = express.Router();
const jokebookController = require('../controllers/jokebookController');


router.get("/", jokebookController.fetchJokebook); 
router.get("/:id", jokebookController.fetchJokeById);
router.get("/type/:type", jokebookController.fetchJokeByType);
router.post("/", jokebookController.createjokebook);
router.delete("/:id", jokebookController.removejokebook);

module.exports = router;