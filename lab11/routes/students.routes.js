const express = require('express');
const router = express.Router();

let students = [];

router.get('/', (request, response, next) => {
    response.render('index');
});

router.get('/add', (request, response, next) => {
    response.render('add_student');
});

router.post('/add', (request, response, next) => {
    const newStudent = {
        id: students.length + 1,
        name: request.body.name,
        grade: request.body.grade,
        studentId: request.body.studentId
    };
    
    students.push(newStudent);
    response.render('student_list', { students: students });
});

router.get('/list', (request, response, next) => {
    response.render('student_list', { students: students });
});

router.get('/edit/:id', (request, response, next) => {
    const student = students.find(s => s.id === parseInt(request.params.id));
    response.render('edit_student', { student: student });
});

router.post('/edit/:id', (request, response, next) => {
    const index = students.findIndex(s => s.id === parseInt(request.params.id));
    students[index] = {
        ...students[index],
        name: request.body.name,
        grade: request.body.grade,
        studentId: request.body.studentId
    };
    response.redirect('/list');
});

router.get('/delete/:id', (request, response, next) => {
    students = students.filter(s => s.id !== parseInt(request.params.id));
    response.redirect('/list');
});

module.exports = router;
