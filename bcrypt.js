process.env.UV_THREADPOOL_SIZE = 4;

const bcrypt = require('bcrypt');
const http = require('http');

http.createServer(function (req, res) {
    bcrypt.hash('test', 2).then(function (hash) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write(hash);
        res.end();
    });
}).listen(8080);