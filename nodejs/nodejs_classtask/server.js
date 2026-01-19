const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const timestamp = new Date().toISOString();
    let pageMessage = '';
    let statusCode = 200;

    switch(req.url) {
        case '/': pageMessage = 'This is Home Page'; break;
        case '/about': pageMessage = 'This is About Page'; break;
        case '/contact': pageMessage = 'This is Contact Page'; break;
        default: 
            statusCode = 404;
            pageMessage = '404 Page Not Found';
    }

    res.writeHead(statusCode, {'Content-Type': 'text/plain'});
    res.end(pageMessage);

    // Async logging AFTER response
    const logEntry = `${timestamp} | ${req.url} | ${pageMessage}\n`;
    fs.appendFile('log.txt', logEntry, 'utf8', (err) => {
        if (err) console.error('Logging error:', err);
    });
});

server.listen(8000, () => console.log('Server on port 8000'));
