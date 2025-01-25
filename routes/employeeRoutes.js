const express = require('express');
const employeeController = require('../controllers/employeeController');
const authenticateJWT = require('../middlewares/authenticateJWT');
const router = express.Router();

router.get('/employees', authenticateJWT, employeeController.getEmployees);
router.get('/managers',  employeeController.getManagers);


router.get('/employees', employeeController.getEmployees);

// Route to get all employees and their count under managers
router.get('/employees/managers', employeeController.getAllEmployeesWithManagers);

module.exports = router;
