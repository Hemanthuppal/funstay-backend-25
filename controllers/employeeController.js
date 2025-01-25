const employeeModel = require('../models/employeeModel');

// Get all employees
// const getEmployees = async (req, res) => {
//   try {
//     const [result] = await employeeModel.getAllEmployees();
//     res.status(200).json({ message: 'Employees fetched successfully', data: result });
//   } catch (error) {
//     res.status(500).json({ message: 'Database error.', error: error.message });
//   }
// };

// Get all managers
const getManagers = async (req, res) => {
  try {
    const [result] = await employeeModel.getAllManagers();
    res.status(200).json({ message: 'Managers fetched successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Database error.', error: error.message });
  }
};


const getEmployees = async (req, res) => {
    const { role } = req.query; // role can be 'manager' or 'employee'
    
    if (!role) {
      return res.status(400).json({ message: 'Role is required.' });
    }
  
    try {
      const employees = await employeeModel.getEmployeesByRole(role);
      res.status(200).json({ data: employees });
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ message: 'Server error.', error: error.message });
    }
  };
  
  // Get all employees to check managers with employees count
  const getAllEmployeesWithManagers = async (req, res) => {
    try {
      const allEmployees = await employeeModel.getAllEmployees();
      const managers = allEmployees.filter(emp => emp.role === 'manager');
      
      // Calculate the count of employees under each manager
      const result = managers.map(manager => {
        const employeesUnderManager = allEmployees.filter(emp => emp.managerId === manager.id);
        return {
          ...manager,
          employeeCount: employeesUnderManager.length,
          teamMembers: employeesUnderManager,
        };
      });
      
      res.status(200).json({ data: result });
    } catch (error) {
      console.error('Error fetching all employees:', error);
      res.status(500).json({ message: 'Server error.', error: error.message });
    }
  };
  

module.exports = {
  getEmployees,
  getManagers,
  getAllEmployeesWithManagers,
};
