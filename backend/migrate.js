const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ranmi",
  password: "password",
  port: 5432,
});

async function runMigration() {
  try {
    const sqlPath = path.join(__dirname, "create_tables.sql");
    const sql = fs.readFileSync(sqlPath, "utf-8");
    await pool.query(sql);
    console.log("Migration completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await pool.end();
  }
}

runMigration();
