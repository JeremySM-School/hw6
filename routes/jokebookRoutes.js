"use strict";
const express = require('express');
const router = express.Router();
const jokebookController = require('../controllers/jokebookController');

router.get('/categories', jokebookController.fetchCategories);

router.get('/category/:category', jokebookController.fetchJokeByCategory);

router.get('/random', jokebookController.fetchRandomJoke);

router.post('/joke/add', jokebookController.createJoke); 

module.exports = router;