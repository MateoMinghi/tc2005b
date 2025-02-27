// Se importan los módulos nativos de Node.js requeridos para el servidor
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

// Se define el puerto en el que el servidor escuchará
const PORT = process.env.PORT || 3000;

// Se crea un servidor HTTP
const server = http.createServer((req, res) => {
    // Se parsea la URL de la solicitud para obtener el pathname y otros parámetros
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Se manejan las peticiones GET
    if (method === 'GET') {
        if (pathname === '/') {
            // Se lee y se sirve el archivo index.html
            fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error al cargar index.html');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else if (pathname === '/about') {
            // Se responde con una página About simple
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Página About</h1><p>Esta es la página acerca de nosotros.</p>');
        } else if (pathname === '/contact') {
            // Se responde con una página de contacto simple
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Página de Contacto</h1><p>Contáctanos en: contacto@ejemplo.com</p>');
        } else {
            // Se intentan servir archivos estáticos solicitados
            const filePath = path.join(__dirname, pathname);
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('HTTP 404 - Página no encontrada');
                } else {
                    // Se determina el tipo MIME basado en la extensión del archivo
                    const ext = path.extname(filePath);
                    const mimeTypes = {
                        '.html': 'text/html',
                        '.css': 'text/css',
                        '.js': 'application/javascript'
                    };
                    const contentType = mimeTypes[ext] || 'application/octet-stream';
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data);
                }
            });
        }
    } else if (method === 'POST') {
        // Se manejan las peticiones POST
        if (pathname === '/submit') {
            let body = '';
            // Se acumulan los datos recibidos en el cuerpo de la solicitud
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                // Se parsea el cuerpo de la solicitud en formato urlencoded
                const parsedBody = querystring.parse(body);
                const formData = parsedBody.formData;

                if (!formData) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('No se recibieron datos');
                } else {
                    // Se guarda la contraseña en el archivo submissions.txt
                    const filePath = path.join(__dirname, 'submissions.txt');
                    fs.appendFile(filePath, formData + '\n', err => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Error al guardar los datos');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end('Datos recibidos y guardados exitosamente.');
                        }
                    });
                }
            });
        } else {
            // Si la ruta POST no es reconocida, se devuelve 404
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('HTTP 404 - Página no encontrada');
        }
    } else {
        // Se rechazan otros métodos HTTP que no sean GET o POST
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

// Se inicia el servidor y se muestra el puerto en la consola
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
