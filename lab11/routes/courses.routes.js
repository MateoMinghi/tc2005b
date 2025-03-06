const express = require('express');
const router = express.Router();

let courses = [];

router.get('/courses', (request, response, next) => {
    response.render('course_list', { courses: courses });
});

router.get('/courses/add', (request, response, next) => {
    response.render('add_course');
});

router.post('/courses/add', (request, response, next) => {
    const newCourse = {
        id: courses.length + 1,
        name: request.body.name,
        code: request.body.code,
        teacher: request.body.teacher
    };
    courses.push(newCourse);
    response.redirect('/courses');
});

router.get('/courses/:id', (request, response, next) => {
    const course = courses.find(c => c.id === parseInt(request.params.id));
    if (course) {
        response.render('course_detail', { course: course });
    } else {
        next();
    }
});

module.exports = router;