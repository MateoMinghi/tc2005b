const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const authController = require('../controllers/auth.controller');

// Protected routes
router.get('/courses', authController.isAuth, courseController.getCourses);
router.get('/courses/add', authController.isAuth, courseController.addCourse);
router.post('/courses/add', authController.isAuth, courseController.createCourse);
router.get('/courses/:id', authController.isAuth, courseController.getCourseDetail);

module.exports = router;