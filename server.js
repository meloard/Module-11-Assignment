const express = require('express');
const path = require('path');
const dataBase = require('./db/db.json');
const fs = require('fs');
//connect proper dependencies and pathing

const PORT = process.env.PORT || 5480;
const app = express();
//set port, call express

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html')));

//using .slice to grab from the array without changing original
app.get('/api/notes', (req, res) => {
    res.json(dataBase.slice(1));
});

app.post('/api/notes', (req, res) => {
        const newNote = makeNote(req.body, dataBase);
        res.json(newNote);
});
//get and post routes 
    

const makeNote = (body, notesArray) => {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];
    if (notesArray.length === 0)
        notesArray.push(0);
    //checks if is array or not

    body.id = notesArray.length;
    notesArray[0]++;
    notesArray.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2),
        console.log('Note Created!'),
    //will console log everytime someone saves a note

    );

    return newNote;

};
    

app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}!!!`);
});