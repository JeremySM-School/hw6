"use strict";
const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const multer = require('multer');
app.use(multer().none());
app.use(express.static('public'));
const jokebookRoutes = require('./routes/jokebookRoutes');

app.use('/jokebook', jokebookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port " + PORT + "...");
});