const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const db = require('./db')
const multer = require('multer');

const app = express();
const port = 3000;

// create application/json parser
var jsonParser = bodyParser.json()

// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, '../client/public')));

// Create the multer instance
const upload = multer();

const createPost = require('./routes/create-post');
app.post('/api/create-post', upload.single('image'), createPost);

const checkToken = require('./routes/check-token');
app.post('/api/check-token', jsonParser, checkToken);

const getTags = require('./routes/get-tags');
app.post('/api/get-tags', jsonParser, getTags);

const getPosts = require('./routes/get-posts');
app.post('/api/get-posts', jsonParser, getPosts);

const getPost = require('./routes/get-post');
app.post('/api/get-post/:id', jsonParser, getPost);

// Handle requests and return the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
