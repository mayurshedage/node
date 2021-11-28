const url = require('url');
const projectRoute = require('./routes/projects.route');

const app = (req, res) => {
    const urlparse = url.parse(req.url, true);

    if (urlparse.pathname == '/' && req.method == 'GET') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end('It works!');
    }
    if (urlparse.pathname == '/projects') {
        projectRoute(req, res);
    }
}

module.exports = app;