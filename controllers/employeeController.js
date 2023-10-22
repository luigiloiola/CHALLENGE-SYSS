const Employee = require('../model/employeeModel.js')




exports.getAllEmployees = async (req, res) => {
    try{
      const employees = await Employee.find();
      res.status(200).json(employees);
    }
    catch(err){
      res.status(500).json({error:err.message});
    }
    
  };
  
  exports.addEmployee = async (req, res) => {
  
    const employee = new Employee(req.body);
    try{
      await employee.save();
      res.json({message: "employee added"});
  
      
    }catch(err) {
      res.status(400).json({message:err.message})
    }
  };
  
  exports.updateEmployeeasync = async (req, res) => {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if (!employee){
      res.status(404).json({message:'employee not found'})
      return;
    };
    res.json(updatedEmployee);
  
  };
  
  exports.deleteEmployee = async (req, res) => {
    try{
  
      const employee = await Employee.findByIdAndDelete(req.params.id);
      if(!employee) {
        res.status(404).json({message:'Employee not found'});
        return;
      }
      res.json({message:'Employee deleted'});
    } catch(error){
      res.status(500).json({error: error.message});
    }
  
  };

  exports.getEmployeeById = async (req, res) =>{
    try{

        const employee = await Employee.findById(req.params.id);
        if(!employee) {
          res.status(404).json({message:'Employee not found'});
          return;
        }
        res.json(employee);
    } catch(error) {
        res.status(500).json({error: error.message});
    }

  }

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