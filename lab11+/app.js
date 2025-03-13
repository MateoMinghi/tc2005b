const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Cookie parser middleware
app.use(cookieParser());

// Session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));

// Make session data available to all views
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.username = req.session.username;
    next();
});

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
const authRoutes = require('./routes/auth.routes');

// Theme preference cookie middleware
app.use((req, res, next) => {
    if (!req.cookies.theme) {
        res.cookie('theme', 'light', { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
    }
    next();
});

// Use route modules
app.use('/', authRoutes);
app.use('/', studentRoutes);
app.use('/', courseRoutes);

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
