const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/salary', reportController.getSalaryReport);
router.get('/age', reportController.getAgeReport);

module.exports = router;
