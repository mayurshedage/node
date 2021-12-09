require('dotenv').config();
const PORT = process.env.GLOBAL_PORT || 8080;

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const userRouter = require('./routes/users.route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL, { autoIndex: false });

const connection = mongoose.connection;
connection.on('error', error => {
    console.error(error);
});

connection.on('open', () => {
    console.log('Connected to mongodb');
});

app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Connected to PORT ${PORT}`)
});