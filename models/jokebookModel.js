"use strict";
const pool = require('../models/dbConnection');

async function getAllJokes() {
    const query = 'SELECT * FROM jokebook';
    const result = await pool.query(query);
    return result.rows;
}

async function getOneJokeById(id) {
    const query = 'SELECT * FROM jokebook WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
}


async function getJokesByCategory(category, limit = null) {
    let queryText = 'SELECT * FROM jokebook WHERE type = $1';
    const values = [category];

    if (limit) {
        queryText += ' LIMIT $2';
        values.push(limit);
    }

    const result = await pool.query(queryText, values);
    return result.rows;
}


async function getCategories() {
    const query = 'SELECT DISTINCT type FROM jokebook';
    const result = await pool.query(query);
    return result.rows.map(row => row.type);
}

async function deleteJokeById(id) {
    const query = 'DELETE FROM jokebook WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rowCount;
}


async function addJoke(category, setup, delivery) {
    const query = 'INSERT INTO jokebook (type, setup, delivery) VALUES ($1, $2, $3) RETURNING *';
    const values = [category, setup, delivery];
    const result = await pool.query(query, values);
    return result.rows[0];
}


async function getRandomJoke() {
    const query = 'SELECT * FROM jokebook ORDER BY RANDOM() LIMIT 1';
    const result = await pool.query(query);
    return result.rows[0];
}

module.exports = {
    fetchJokebook: getAllJokes,
    fetchJokeById: getOneJokeById,
    fetchJokeByCategory: getJokesByCategory,
    getCategories: getCategories, 
    getRandomJoke: getRandomJoke, 
    removejokebook: deleteJokeById,
    createjokebook: addJoke       
};