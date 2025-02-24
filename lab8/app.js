const file_system = require('fs');

file_system.writeFileSync('hola.txt', 'Hola mundo'); //escribe un archivo de manera sincrónica



const arreglo = [5000, 60, 90, 100, 10, 20];

// Sort the array in ascending order
arreglo.sort((a, b) => a - b);

for (let item of arreglo){
    setTimeout(() => {
        console.log(item);
    }, item);
}


const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.sethHeader('Content-Type', 'text/html');
    res.write('');
    res.end();
});


server.listen(3000);