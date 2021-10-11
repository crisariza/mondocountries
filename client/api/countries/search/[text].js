let db = require("../../../db");

module.exports = async (req, res) => {
  try {
    const { text } = req.params;
    const country = await db.query(
      "SELECT * FROM countries WHERE LOWER(name) LIKE LOWER(CONCAT('%', $1::letchar , '%')) ORDER by country_id",
      [text]
    );
    res.json(country.rows);
  } catch (err) {
    res.json({ error: err.message });
  }
};