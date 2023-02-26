const notes = require('express').Router();
const {readAndAppend, readFromFile} = require('../helpers/fsUtils');

notes.get('/', (req,res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
    return;
});

// notes.delete('/:note', (req, res) => {
//     return;
// });

module.exports = notes;