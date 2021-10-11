require("dotenv").config({ path: "./process.env" });
const Pool = require("pg").Pool;
const { DATABASE_URL } = process.env;

const db = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = db;
