"use strict";

const model = require('../models/jokebookModel');

async function fetchJokebook(req, res) {
    try {
        const jokebook = await model.fetchJokebook();
        res.json(jokebook);
    } catch (err) {
        console.error('Error fetching jokebook:', err);
        res.status(500).send('Internal Server Error');
    }
}

async function fetchJokeById(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const joke = await model.fetchJokeById(id);
            // Fixed: was res.json(user), changed to joke
            res.json(joke); 
        } catch (err) {
            console.error('Error fetching joke:', err);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(400).send('Bad Request: Missing joke ID');
    }
}

async function fetchUserById(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const user = await model.fetchUserById(id);
            res.json(user);
        } catch (err) {
            // Fixed: changed 'error' to 'err' to match catch block
            console.error('Error fetching user:', err); 
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(400).send('Bad Request: Missing user ID');
    }
}

async function removeUser(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const deletedCount = await model.removeUser(id);
            if (deletedCount > 0) {
                res.sendStatus(204);
            } else {
                res.status(404).send('User not found');
            }
        } catch (err) {
            console.error('Error removing user:', err);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(400).send('Bad Request: Missing user ID');
    }
}

async function createUser(req, res) {
    const { name, email, password } = req.body;
    if (name && email && password) {
        try {
            const newUser = await model.createUser(name, email, password);
            res.status(201).json(newUser);
        } catch (err) {
            console.error('Error creating user:', err);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(400).send('Bad Request: Missing required fields');
    }
}

// Fixed: module.exports must be at the top level, not inside a function
module.exports = {
    fetchJokebook,
    fetchJokeById,
    fetchUserById,
    removeUser,
    createUser
};