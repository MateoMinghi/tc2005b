const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware for logging
app.use((request, response, next) => {
    console.log(`${request.method} ${request.url}`);
    next(); 
});

// Import route modules
const studentRoutes = require('./routes/students.routes');
const courseRoutes = require('./routes/courses.routes');

// Use route modules
app.use('/', studentRoutes);
app.use('/', courseRoutes);

// Update home page to include course links
app.get('/', (request, response) => {
    response.render('index');
});

// 404 handler - must be after all other routes
app.use((request, response, next) => {
    response.status(404).render('404', { 
        path: request.path 
    });
});

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
