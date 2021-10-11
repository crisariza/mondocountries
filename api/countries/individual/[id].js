let db = require("../../db");

module.exports = async (req, res) => {
  try {
    const { id } = req.query;
    const country = await db.query(
      "SELECT * FROM countries WHERE LOWER(cca3) = LOWER($1)",
      [id]
    );
    const activity = await db.query(
      "SELECT * FROM activities WHERE LOWER(cca3) LIKE LOWER(CONCAT('%', TEXT($1), '%')) ORDER by activity_id",
      [id]
    );
    res.json(
      country
        ? { country: country.rows[0], activities: activity.rows }
        : { message: "Country not found." }
    );
  } catch (err) {
    res.json({ error: err.message });
  }
};
