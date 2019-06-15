const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const env = fs.readFileSync(path.resolve(__dirname, '..', '.env'), 'utf8').split("\r\n");
const user = env[0].replace('USER=', '');
const pass = env[1].replace('PASSWORD=', '');

mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0-zc2lk.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
});

app.use((req, res, next) => {
    req.io = io;

    next();
});

app.use(cors());

app.use(require('./routes'));

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

server.listen(3333);