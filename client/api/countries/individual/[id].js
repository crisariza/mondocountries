let db = require("../../db");

module.exports = async (req, res) => {
  try {
    console.log(req.query);
    const { id } = req.params;
    const country = await db.query(
      "SELECT * FROM countries WHERE LOWER(cca3) = LOWER($1)",
      [id]
    );
    const activity = await db.query(
      "SELECT * FROM activities WHERE LOWER(cca3) LIKE LOWER(CONCAT('%', $1::letchar , '%')) ORDER by activity_id",
      [id]
    );
    res.json({ country: country.rows[0], activities: activity.rows });
  } catch (err) {
    res.json({ error: err.message });
  }
};
