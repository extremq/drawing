const config = require('./config.js');

// Get the username and password from the .config.ini file
const mongo_username = config.MONGO_USERNAME;
const mongo_password = config.MONGO_PASSWORD;
const mongo_host = config.MONGO_HOST;
const mongo_database_name = config.MONGO_DATABASE_NAME;

// Connect to MongoDB
const mongoose = require('mongoose');
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@${mongo_host}/?retryWrites=true&w=majority`;

// Create a new client
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

module.exports = mongoose;