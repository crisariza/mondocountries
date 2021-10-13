let db = require("../db");

module.exports = async (req, res) => {
  try {
    const countries = await db.query("SELECT * FROM countries ORDER by name");
    res.json(countries.rows);
  } catch (err) {
    res.json({ error: err.message });
  }
};
