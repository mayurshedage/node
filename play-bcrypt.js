process.env.UV_THREADPOOL_SIZE = 12;

const bcrypt = require('bcrypt');
const http = require('http');
const url = require('url')

const PLAIN_TEXT_PASSWORD = 'jscracker';
const BCRYPTED_HASH = '$2b$10$rMvjIL9jhLHhBVqqzubT1u3rH4X3g3Ew0uP0dyl9ZQl0S7E1ZNdXi';

const app = function (req, res) {
    const urlparse = url.parse(req.url, true);

    switch (urlparse.pathname) {
        case '/hash':
            bcrypt.hash(PLAIN_TEXT_PASSWORD, 10, function (err, hash) {
                // Store hash in your password DB.
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.write(JSON.stringify({ 'hash': hash }));
                res.end();
            });
            break;

        case '/compare':
            bcrypt.compare(
                PLAIN_TEXT_PASSWORD,
                BCRYPTED_HASH,
                function (err, result) {
                    // result == true
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    if (result) {
                        res.write(JSON.stringify({ 'success': true, message: 'Login successful' }));
                    } else {
                        res.write(JSON.stringify({ 'success': false, message: 'Login failed' }));
                    }
                    res.end();
                });
        case 'default':
            break;
    }
};

http.createServer(app).listen(8080);