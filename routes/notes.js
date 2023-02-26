// import requirements
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const {readAndAppend, readFromFile, writeToFile} = require('../helpers/fsUtils');

// GET request for displaying notes stored in db.json
notes.get('/', (req,res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST request for adding new notes to db.json
notes.post('/', (req, res) => {
    // destructure user input
    const {title, text} = req.body;

    // if the new note does indeed have a title and text...
    if (title && text) {
        // newNote object containing title, text, AND unique id
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        // add newNote object to array in db.json
        readAndAppend(newNote, './db/db.json');

        // make response object
        const response = {
            status: 'success',
            body: newNote
        };

        // send back response
        res.json(response);
    } else {
        // error in event that title or text is missing somehow
        res.json('Error in posting note');
    }
});

// DELETE request for deleting undesired notes
notes.delete('/:noteId', (req, res) => {
    // stores unique id of note to be deleted
    const requestedNoteId = req.params.noteId;

    // read db.json...
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            // error
            console.error(err);
        } else {
            // if no errors, save parsed db data into parsedData array
            const parsedData = JSON.parse(data);
            
            // loop over parsedData array, and if an element's id matches requestedNoteId, splice it out (and break the loop since we've accomplished all we came for)
            for(i = 0; i < parsedData.length; i++) {
                if (parsedData[i].id == requestedNoteId) {
                    parsedData.splice(i, 1);
                    break;
                }
            }

            // overwrite db.json with parsedData now that it no longer includes the note we wanted to delete
            writeToFile('./db/db.json', parsedData);
        }
    });

    // json response to let front-end know we're finished on the back-end
    res.json();
});

//export
module.exports = notes;