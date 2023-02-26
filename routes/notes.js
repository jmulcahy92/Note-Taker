const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const {readAndAppend, readFromFile, writeToFile} = require('../helpers/fsUtils');

notes.get('/', (req,res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
    const {title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote
        };

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
});

notes.delete('/:noteId', (req, res) => {
    const requestedNoteId = req.params.noteId; // stores unique id of note to be deleted

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            
            for(i = 0; i < parsedData.length; i++) {
                if (parsedData[i].id == requestedNoteId) {
                    parsedData.splice(i, 1);
                }
            }

            writeToFile('./db/db.json', parsedData);
        }
    });

    res.json(response);
});

module.exports = notes;