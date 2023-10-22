require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to the database"));

app.use(bodyParser.json());
app.use(cookieParser());

const sampleUser = {
  username: 'admin',
  password:'password'
};

// Middleware to check JWT for authentication
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // assuming the token is in a cookie named 'token'

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
};

// Apply authentication middleware to all routes under '/employees' and '/reports/employees'
app.use('/employees', authenticateToken, require('./routes/employeeRoutes'));
app.use('/reports/employees', authenticateToken, require('./routes/reportRoutes'));

// Login route to generate a token
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check username and hashed password (this is a simplistic example)
  if (username === sampleUser.username && password ===sampleUser.password) {
    const user = { username };
    const accessToken = jwt.sign(user, process.env.JWT_SECRET);
    res.cookie('token', accessToken, { httpOnly: true });
    res.json({ accessToken });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Logout route to clear the token
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
