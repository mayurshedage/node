const fs = require('fs');
const path = require('path');

const readFile = (req, res) => {
    switch (req.method) {
        case 'GET':
            const filepath = path.join(__dirname, './test.json');
            // const filepath = path.join(__dirname, '../data.json');
            const stream = fs.createReadStream(filepath, {
                flags: 'r',
                encoding: 'utf-8'
            });
            stream.on('open', () => {
                stream.pipe(res);
            });
            stream.on('error', (err) => {
                res.end(err);
            });
            break;

        case 'default':
            break;
    }
}

module.exports = readFile;