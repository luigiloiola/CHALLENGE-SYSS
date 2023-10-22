require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const loginController = require('./controllers/loginController');
const authentication = require('./controllers/authentication')

const app = express();
const PORT = 8000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to the database"));

app.use(bodyParser.json());
app.use(cookieParser());

// Apply authentication middleware to all routes under '/employees' and '/reports/employees'
app.use('/employees', authentication.authenticateToken, require('./routes/employeeRoutes'));
app.use('/reports/employees', authentication.authenticateToken, require('./routes/reportRoutes'));

// Login route to generate a token
app.post('/login', loginController.login);

// Logout route to clear the token
app.post('/logout', loginController.logout);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});