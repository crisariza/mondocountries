let db = require("../../db");

module.exports = async (req, res) => {
  try {
    const { text } = req.query;
    const country = await db.query(
      "SELECT * FROM countries WHERE LOWER(name) LIKE LOWER(CONCAT('%', TEXT($1), '%')) ORDER by country_id",
      [text]
    );
    res.json(country ? country.rows : { message: "Country not found." });
  } catch (err) {
    res.json({ error: err.message });
  }
};
