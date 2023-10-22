const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  department: String,
  salary: Number,
  birth_date: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;