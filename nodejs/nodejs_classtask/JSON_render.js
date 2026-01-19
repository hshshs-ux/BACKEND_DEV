const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    if (pathname === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end("Welcome to the server!");
        return;
    }
    
    if (pathname === '/about') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end("<h1>About Page</h1>");
        return;
    }
    
    if (pathname === '/user') {
        const name = parsedUrl.query.name || 'Unknown';
        const age = parsedUrl.query.age || 'Unknown';
        
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ name, age }));
        return;
    }

    res.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    res.end("404 Page Not Found");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
