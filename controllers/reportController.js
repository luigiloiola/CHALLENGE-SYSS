const Employee = require('../model/employeeModel');

exports.getSalaryReport =  async (req, res) => {
    try {
      const employees = await Employee.find();
  
      if (employees.length === 0) {
        return res.status(404).json({ message: 'No employees available' });
      }
  
      const lowestSalary = employees.reduce((min, employee) => (employee.salary < min ? employee.salary : min), employees[0].salary);
      const highestSalary = employees.reduce((max, employee) => (employee.salary > max ? employee.salary : max), employees[0].salary);
      const averageSalary = employees.reduce((sum, employee) => sum + employee.salary, 0) / employees.length;
  
      const result = {
        lowest: employees.find(employee => employee.salary === lowestSalary),
        highest: employees.find(employee => employee.salary === highestSalary),
        average: parseFloat(averageSalary)
      };
  
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };
  exports.getAgeReport = async (req, res) => {
    try {
      const employees = await Employee.find();
  
      if (employees.length === 0) {
        return res.status(404).json({ message: 'No employees available' });
      }
      

      const now = new Date();
      const youngestEmployee = employees.reduce((min, employee) => {
        const birthDate = new Date(employee.birth_date);
        const age = now.getFullYear() - birthDate.getFullYear();
        return age < min ? age : min;
      }, now.getFullYear() - new Date(employees[0].birth_date).getFullYear());
  
      const oldestEmployee = employees.reduce((max, employee) => {
        const birthDate = new Date(employee.birth_date);
        const age = now.getFullYear() - birthDate.getFullYear();
        return age > max ? age : max;
      }, now.getFullYear() - new Date(employees[0].birth_date).getFullYear());
  
      const averageAge = employees.reduce((sum, employee) => {
        const birthDate = new Date(employee.birth_date);
        const age = now.getFullYear() - birthDate.getFullYear();
        return sum + age;
      }, 0) / employees.length;
  
      const result = {
        younger: employees.find(employee => {
          const birthDate = new Date(employee.birth_date);
          const age = now.getFullYear() - birthDate.getFullYear();
          return age === youngestEmployee;
        }),
        older: employees.find(employee => {
          const birthDate = new Date(employee.birth_date);
          const age = now.getFullYear() - birthDate.getFullYear();
          return age === oldestEmployee;
        }),
        average: averageAge
      };
  
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };