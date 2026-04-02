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

async function getJokesByType(type, setup = null, delivery = null) {
    const queryText = `
        SELECT * FROM jokebook 
        WHERE type = $1 
        AND ($2::text IS NULL OR setup = $2) 
        AND ($3::text IS NULL OR delivery = $3)
    `;
    const values = [type, setup, delivery];
    const result = await pool.query(queryText, values);
    return result.rows;
}

async function deleteJokeById(id) {
    const query = 'DELETE FROM jokebook WHERE id = $1';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rowCount; // Returns how many rows were deleted
}

async function addJoke(type, setup, delivery) {
    const query = 'INSERT INTO jokebook (type, setup, delivery) VALUES ($1, $2, $3) RETURNING *';
    const values = [type, setup, delivery];
    const result = await pool.query(query, values);
    return result.rows[0];
}


module.exports = {
    fetchJokebook: getAllJokes,
    fetchJokeById: getOneJokeById,
    fetchJokeByType: getJokesByType,
    removejokebook: deleteJokeById,
    createjokebook: addJoke 
};