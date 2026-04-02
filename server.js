"use strict";
const express = require("express");
const app = express();

const multer = require('multer');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().none());
app.use(express.static('public'));

const jokebookRoutes = require('./routes/jokebookRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/api/jokebooks', jokebookRoutes);
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port " + PORT + "...");
});