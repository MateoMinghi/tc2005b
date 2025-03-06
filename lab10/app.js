const http = require('http');
const fs = require('fs');
const { resolve } = require('path');

const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.method === 'GET') {
        console.log(req.url);
        res.setHeader('Content-Type', 'text/html');
        res.write(hmtl)
        res.end();
    } else if (res.method === 'POST') {
        req.on('data', (data) => {
            console.log(data);
        })
    }
});

server.listen(3000);