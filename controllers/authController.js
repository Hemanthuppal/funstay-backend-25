const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const employeeModel = require('../models/employeeModel');

const SECRET_KEY = 'your-secret-key';

// Register new user
const register = async (req, res) => {
    const { name, mobile, email, password, role, assignManager } = req.body;
  
    // Validate required fields
    if (!name || !mobile || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      let managerName = null;
      let managerId = null;
  
      // Check for manager if role is employee
      if (role === 'employee' && assignManager) {
        // Fetch manager directly by ID
        const manager = await employeeModel.getManagerById(assignManager);
        if (manager) {
          managerName = manager.name;
          managerId = manager.id;
        } else {
          return res.status(400).json({ message: 'Invalid manager selected.' });
        }
      }
  
      // Prepare employee data for insertion
      const employeeData = {
        name,
        mobile,
        email,
        password: hashedPassword,
        role,
        managerName,
        managerId
      };
  
      // Register employee in database
      const [result] = await employeeModel.registerEmployee(employeeData);
  
      // Generate JWT token
      const token = jwt.sign(
        { id: result.insertId, email, role },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
  
      res.status(201).json({
        message: 'User registered successfully.',
        data: result,
        token
      });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Server error.', error: error.message });
    }
  };
  
// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const [result] = await employeeModel.getEmployeeByEmail(email);

    if (result.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful.',
      token,
      role: user.role,
      id: user.id
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

module.exports = {
  register,
  login
};
