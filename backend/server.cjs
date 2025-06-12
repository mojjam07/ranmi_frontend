const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 4000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ranmi",
  password: "password",
  port: 5432,
});

app.use(cors());
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({ status: "Server is running" });
});

app.post("/api/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email",
      [firstName, lastName, email, password]
    );
    res.json({ message: "Signup successful", user: result.rows[0] });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT id, first_name, last_name, email FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful", user: result.rows[0] });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/reviews", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, author, rating, comment FROM reviews"
    );
    res.set("Cache-Control", "no-store");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Backend API server listening at http://localhost:${port}`);
});
