"use strict";
const model = require('../models/jokebookModel');


const handleServerError = (res, err, message) => {
    console.error(message, err);
    res.status(500).send('Internal Server Error');
};

async function fetchJokebook(req, res) {
    try {
        const jokebook = await model.fetchJokebook();
        res.json(jokebook);
    } catch (err) {
        handleServerError(res, err, 'Error fetching jokebook:');
    }
}

async function fetchJokeById(req, res) {
    const { id } = req.params;
    if (!id) return res.status(400).send('Bad Request: Missing joke ID');

    try {
        const joke = await model.fetchJokeById(id);
        if (!joke) return res.status(404).send('Joke not found');
        res.json(joke);
    } catch (err) {
        handleServerError(res, err, 'Error fetching joke:');
    }
}

async function fetchJokeByCategory(req, res) {
    const { category } = req.params;
    const { limit } = req.query;

    try {
        const jokes = await model.fetchJokeByCategory(category, limit);
        if (jokes.length === 0) return res.status(404).send('Category not found');
        res.json(jokes);
    } catch (err) {
        handleServerError(res, err, 'Error fetching category');
    }
}

async function removejokebook(req, res) {
    const { id } = req.params;
    if (!id) return res.status(400).send('Bad Request: Missing joke ID');

    try {
        const deletedCount = await model.removejokebook(id);
        if (deletedCount > 0) {
            res.send(`Joke with id ${id} deleted successfully`);
        } else {
            res.status(404).send(`Joke with id ${id} not found`);
        }
    } catch (err) {
        handleServerError(res, err, 'Error removing joke:');
    }
}

async function createjokebook(req, res) {

    const { category, setup, delivery } = req.body;

    if (category && setup && delivery) {
        try {
            await model.createjokebook(category, setup, delivery);

            const updatedList = await model.fetchJokeByCategory(category);
            res.status(201).json(updatedList);
        } catch (err) {
            handleServerError(res, err, 'Error creating joke:');
        }
    } else {

        res.status(400).send('Bad Request: Missing required fields');
    }
}

async function fetchCategories(req, res) {
    try {
        const categories = await model.getCategories(); 
        res.json(categories); 
    } catch (err) {
        handleServerError(res, err, 'Error fetching categories');
    }
}

async function fetchRandomJoke(req, res) {
    try {
        const joke = await model.getRandomJoke(); 
        res.json(joke); 
    } catch (err) {
        handleServerError(res, err, 'Error fetching random joke');
    }
}




module.exports = {
    fetchCategories,
    fetchJokeByCategory,
    fetchRandomJoke,
    createJoke: createjokebook,
};