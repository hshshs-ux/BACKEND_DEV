// 


const http = require('http');

let todos = [];
let nextId = 1;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.url === '/api/todos' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    }

    else if (req.url === '/api/todos' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const data = JSON.parse(body);
            const newTodo = { id: nextId++, task: data.task, completed: false };
            todos.push(newTodo);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newTodo));
        });
    }

    else if (req.url.startsWith('/api/todos/') && req.method === 'PUT') {
        const id = parseInt(req.url.split('/')[3]);
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const index = todos.findIndex(t => t.id === id);
            if (index !== -1) {
                todos[index] = { ...todos[index], ...JSON.parse(body) };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(todos[index]));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Task not found' }));
            }
        });
    }

    else if (req.url.startsWith('/api/todos/') && req.method === 'DELETE') {
        const id = parseInt(req.url.split('/')[3]);
        const initialLength = todos.length;
        todos = todos.filter(t => t.id !== id);

        if (todos.length < initialLength) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Deleted' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Task not found' }));
        }
    }

    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

server.listen(3000, () => {
    console.log('TODO API running at http://localhost:3000');
    console.log('Use /api/todos for your requests');
});
