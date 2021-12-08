const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const fs = require('fs');

const uploadRoute = require('./routes/upload.route');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
    limit: '50mb',
    extended: true
}));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/test', (req, res) => {
    res.send({
        code: 'OK',
        message: 'This is test route'
    });
});

app.get('/read', async (req, res) => {
    const file = fs.readFileSync('read.json');

    console.log(file);

    res.status(200).json(file)
});

app.use(uploadRoute);

module.exports = app;