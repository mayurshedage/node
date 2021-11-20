const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('It Works!')
})

app.listen(8081);