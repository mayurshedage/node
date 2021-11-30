const fs = require('fs');

const readstream = fs.createReadStream('data.json');
const writestream = fs.createWriteStream('data1.json');

readstream.pipe(writestream);