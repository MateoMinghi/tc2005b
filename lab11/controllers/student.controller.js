const Student = require('../models/student.model');

let students = [];

exports.getStudents = (req, res) => {
    res.render('student_list', { students });
};

exports.addStudent = (req, res) => {
    res.render('add_student');
};

exports.createStudent = (req, res) => {
    const newStudent = new Student(
        students.length + 1,
        req.body.name,
        req.body.grade,
        req.body.studentId
    );
    students.push(newStudent);
    res.redirect('/students');
};

exports.editStudent = (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    res.render('edit_student', { student });
};

exports.updateStudent = (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    students[index] = {
        ...students[index],
        name: req.body.name,
        grade: req.body.grade,
        studentId: req.body.studentId
    };
    res.redirect('/students');
};

exports.deleteStudent = (req, res) => {
    students = students.filter(s => s.id !== parseInt(req.params.id));
    res.redirect('/students');
};