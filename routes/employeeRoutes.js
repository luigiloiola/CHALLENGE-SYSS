const express = require('express');

const router = express.Router();

const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.getAllEmployees);
router.post('/', employeeController.addEmployee);
router.get('/:id', employeeController.getEmployeeById);
router.delete('/:id', employeeController.deleteEmployee)

module.exports = router;

