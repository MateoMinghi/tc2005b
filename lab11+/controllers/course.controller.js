const Course = require('../models/course.model');

let courses = [];

exports.getCourses = (req, res) => {
    res.render('course_list', { courses });
};

exports.addCourse = (req, res) => {
    res.render('add_course');
};

exports.createCourse = (req, res) => {
    const newCourse = new Course(
        courses.length + 1,
        req.body.name,
        req.body.code,
        req.body.teacher
    );
    courses.push(newCourse);
    res.redirect('/courses');
};

exports.getCourseDetail = (req, res, next) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (course) {
        res.render('course_detail', { course });
    } else {
        next();
    }
};