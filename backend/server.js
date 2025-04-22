const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.post('/api/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // Here you would normally save the user to a database
  console.log('Signup data received:', req.body);
  res.json({ message: 'Signup successful', user: { firstName, lastName, email } });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Here you would normally check credentials
  console.log('Login data received:', req.body);
  res.json({ message: 'Login successful', user: { email } });
});

app.listen(port, () => {
  console.log(`Backend API server listening at http://localhost:${port}`);
});
