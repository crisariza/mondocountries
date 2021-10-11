var db = require("./db");

module.exports = (req, res) => {
  try {
    const countries = await db.query(
      "SELECT * FROM countries ORDER by country_id"
    );
    res.json(countries.rows);
  } catch (err) {
    res.json(err.message);
  }
};
