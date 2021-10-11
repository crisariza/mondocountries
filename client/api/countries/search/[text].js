let db = require("../../db");

module.exports = async (req, res) => {
  try {
    const { text } = req.query;
    const country = await db.query(
      "SELECT * FROM countries WHERE LOWER(name) LIKE LOWER(CONCAT('%', $1, '%')) ORDER by country_id",
      [text.toString()]
    );
    res.json(country.rows);
  } catch (err) {
    res.json({ error: err.message });
  }
};
