const url = require('url');
const projectRoute = require('./routes/projects.route');
const loginRoute = require('./routes/login.route');

const app = (req, res) => {
    const urlparse = url.parse(req.url, true);

    switch (urlparse.pathname) {
        case '/':
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end('It works!');
            break;

        case '/projects':
            return projectRoute(req, res);

        case '/login':
            return loginRoute(req, res);

        case 'default':
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end('Nothing to look here!');
    }
}

module.exports = app;