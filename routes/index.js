// import express and notes.js
const express = require('express');
const notesRouter = require('./notes');

// initialize our app variable by setting it to the value of express()
const app = express();

// look in notes.js
app.use('/notes', notesRouter);

// export
module.exports = app;