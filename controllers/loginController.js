const jwt = require('jsonwebtoken');

const sampleUser = {
    username: 'admin',
    password:'password'
  };
  

exports.login =  async (req, res) => {
    const { username, password } = req.body;
  
    if (username === sampleUser.username && password ===sampleUser.password) {
      const user = { username };
      const accessToken = jwt.sign(user, process.env.JWT_SECRET);
      res.cookie('token', accessToken, { httpOnly: true });
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  };
  
  
exports.logout =  (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  };