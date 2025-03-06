const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const authController = require('../controllers/auth.controller');

router.get('/', (req, res) => {
    res.render('index', {
        theme: req.cookies.theme || 'light'
    });
});

// Protected routes
router.get('/students', authController.isAuth, studentController.getStudents);
router.get('/students/add', authController.isAuth, studentController.addStudent);
router.post('/students/add', authController.isAuth, studentController.createStudent);
router.get('/students/edit/:id', authController.isAuth, studentController.editStudent);
router.post('/students/edit/:id', authController.isAuth, studentController.updateStudent);
router.get('/students/delete/:id', authController.isAuth, studentController.deleteStudent);

module.exports = router;
