let db = require("./db");

async function bulkScript() {
  await db.query(
    "CREATE TABLE IF NOT EXISTS countries(country_id SERIAL PRIMARY KEY, cca3 VARCHAR(3), name VARCHAR(255), flag VARCHAR(255), capital VARCHAR(255), region VARCHAR(255), subregion VARCHAR(255), area DECIMAL, population INTEGER)"
  );
  console.log("countries table up");
  await db.query(
    "CREATE TABLE IF NOT EXISTS activities(activity_id SERIAL PRIMARY KEY, title VARCHAR(255), difficulty INTEGER, duration INTEGER, season VARCHAR(6), cca3 VARCHAR(255))"
  );
  console.log("activities table up");
}

module.exports = {
  bulkScript,
};
