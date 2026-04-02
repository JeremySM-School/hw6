"use strict";
const pool = require('../dbConnection');

async function getAllUsers() {
    const queryText = 'SELECT * FROM users';
    const result = await pool.query(queryText);
    return result.rows;
}

async function getOneUserById(id) { 
    const queryText = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function deleteUser(id) {
    const queryText = 'DELETE FROM users WHERE id = $1';
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addUser(name, email, password) { 
    const queryText = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, password];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    fetchUserById: getOneUserById,
    removeUser: deleteUser,
    createUser: addUser,
    getAllUsers
};