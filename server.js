// import express, path, and ./routes/index.js
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// set PORT based on environment or default to 3001
const PORT = process.env.PORT || 3001;

// initialize our app variable by setting it to the value of express()
const app = express();

// middleware for parsing json and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// look to ./routes/index.js for api requests
app.use('/api', api);

// 'public' folder contains front-end
app.use(express.static('public'));

// GET notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET homepage; line 20 plus the appropriate file being named index.html means the '/' path will lead to the homepage as desired
// but this '*' path will also catch any bad pathways
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// listen on environment-determined port or port 3001 by default
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});