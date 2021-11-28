const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const data = fs.readFileSync(path.join(__dirname, '../data.json'));
let projects = JSON.parse(data);

let lastIndex = projects.length === 0 ? 0 : projects[projects.length - 1].id;
const CONTENT_TYPE = {
    'Content-Type': 'application/json'
};

const projectRoute = (req, res) => {
    switch (req.method) {
        case 'GET':
            res.writeHead(200, CONTENT_TYPE);
            res.end(JSON.stringify(projects, null, 2));
            break;
        case 'POST':
            handlePostRoute(req, res);
            break;
        case 'PUT':

            break;
        case 'DELETE':

            break;

        default:
            break;
    }
}

const handlePostRoute = (req, res) => {
    req.on('data', data => {
        const jsondata = JSON.parse(data.toString());
        const title = jsondata.title;

        if (title) {
            projects.push({ id: ++lastIndex, title, tasks: [] });
            fs.writeFile(path.join(__dirname, '../data.json'), JSON.stringify(projects), (err) => {
                if (err) {
                    const messge = { message: 'Could not persist data!' }
                    res.writeHead(500, CONTENT_TYPE);
                    res.end(JSON.stringify(messge, null, 2));
                } else {
                    res.writeHead(200, CONTENT_TYPE);
                    res.end(JSON.stringify(projects));
                }
            });
        } else {
            const message = { message: 'title missing in request body!' };
            res.writeHead(400, CONTENT_TYPE);
            res.end(JSON.stringify(message, null, 2));
        }
    });
}

module.exports = projectRoute;