let db = require("../../../db");

module.exports = async (req, res) => {
  try {
    const { title, difficulty, duration, season, countries } = req.body;
    const activity = await db.query(
      "INSERT INTO activities (title, difficulty, duration, season, cca3) VALUES ($1, $2, $3, $4, $5);",
      [title, difficulty, duration, season, countries]
    );
    res.json(activity);
  } catch (err) {
    res.json({ error: err.message });
  }
};
