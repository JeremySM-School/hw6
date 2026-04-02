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

async function fetchJokeByType(req, res) {
    const { type } = req.params;
    const { setup, delivery } = req.query;

    if (!type) return res.status(400).send('Bad Request: Missing joke type');

    try {
        const params = [type, setup, delivery].filter(p => p !== undefined);
        const jokes = await model.fetchJokeByType(params);
        res.json(jokes);
    } catch (err) {
        handleServerError(res, err, 'Error fetching jokes by type:');
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
    const { type, setup, delivery } = req.body;
    if (type && setup && delivery) {
        try {
            const newJoke = await model.createjokebook(type, setup, delivery);
            res.status(201).json(newJoke);
        } catch (err) {
            handleServerError(res, err, 'Error creating joke:');
        }
    } else {
        res.status(400).send('Bad Request: Missing required fields');
    }
}

module.exports = {
    fetchJokebook,
    fetchJokeById,
    fetchJokeByType,
    removejokebook,
    createjokebook
};