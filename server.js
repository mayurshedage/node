const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 8081;

const server = http.createServer(app);

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof PORT === 'string' ? 'pipe ' + PORT : 'Port ' + PORT;

    switch (error.code) {
        case 'ESACCESS':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);

        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);

        case 'default':
            process.exit(1);
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

    console.log(`Listening on ${bind}`);
}