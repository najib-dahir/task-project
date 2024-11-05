const { log } = require('console');
const http = require('http');
const PORT = 3000;
const HOSTNAME = 'localhost';

// Create and configure server
const server = http.createServer((req, res) => {
    if (req.url.startsWith('/tasks')) {
        // Handle /tasks endpoint
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Tasks endpoint hit' }));
    } else {
        // Handle other endpoints (404 Not Found)
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'PAGE NOT FOUND' }));
    }
});

// Start server and listen on PORT and HOSTNAME
server.listen(PORT, HOSTNAME, () => {
    console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});