const jwt = require('jsonwebtoken');
const url = require('url');

const SECRETE_TOKEN = '$2b$10$AP.oVqNxjP10uujnuqpiPe8g3V6JQh/TeN0VrS3.RCCg.gIbaw8qK';

const loginRoute = (req, res) => {
    switch (req.method) {
        case 'POST':
            const token = jwt.sign({ id: 10, name: 'testuser' }, SECRETE_TOKEN);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.write(token);
            res.end();

        case 'GET':
            const queryObject = url.parse(req.url, true).query;

            try {
                if (!jwt.verify(queryObject.token, SECRETE_TOKEN)) {

                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.write(queryObject.token);
                    res.end();
                }
            } catch (error) {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify({ error: 'ERR_AUTH_TOKEN', 'message': 'Invalid signature' }));
                res.end();
                console.log(error.message);
            }

        case 'default':
            return;
    }
}

module.exports = loginRoute;

